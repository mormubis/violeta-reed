import * as awsx from '@pulumi/aws';
import * as dns from 'dns';

async function resolve(domain: string): Promise<string> {
  return new Promise((ok, ko) => {
    dns.lookup(domain, (err, address) => {
      if (err) {
        return ko(err);
      }

      ok(address);
    });
  });
}

const NS = ['book', 'framboise', 'love', 'wonderland'];

/** DOMAIN */
const domain = new awsx.route53.Zone('domain', { name: 'violetareed.com' });

domain.nameServers.apply((nameservers) => {
  nameservers.forEach(async (ns: string, index: number) => {
    new awsx.route53.Record(NS[index], {
      name: NS[index],
      records: [await resolve(ns)],
      ttl: 60 * 60, // 1 hour
      type: 'A',
      zoneId: domain.zoneId,
    });
  });
});

new awsx.route53.Record('NS', {
  allowOverwrite: true,
  name: '',
  records: NS.map((ns) => `${ns}.violetareed.com`),
  ttl: 24 * 60 * 60, // 1 day
  type: 'NS',
  zoneId: domain.zoneId,
});

new awsx.route53.Record('SOA', {
  allowOverwrite: true,
  name: '',
  records: ['book.violetareed.com. postmaster.violetareed.com. 1 7200 900 1209600 86400'],
  ttl: 900,
  type: 'SOA',
  zoneId: domain.zoneId,
});

new awsx.route53.Record('CNAME', {
  name: 'www.violetareed.com',
  records: ['violetareed.com'],
  ttl: 900,
  type: 'CNAME',
  zoneId: domain.zoneId,
});

const ssl = new awsx.acm.Certificate('ssl', {
  domainName: domain.name,
  subjectAlternativeNames: [domain.name.apply((name) => `www.${name}`)],
  validationMethod: 'DNS',
});

ssl.domainValidationOptions.apply((options) => {
  options.forEach(({ resourceRecordName: name, resourceRecordType: type, resourceRecordValue: value }) => {
    new awsx.route53.Record(`cert-${name}`, {
      allowOverwrite: true,
      name,
      records: [value],
      ttl: 60,
      type,
      zoneId: domain.zoneId,
    });
  });
});

/** NETWORK */
const vpc = new awsx.ec2.Vpc('network', { cidrBlock: '10.0.0.0/16' });

const gateway = new awsx.ec2.InternetGateway('internet-gateway');

new awsx.ec2.InternetGatewayAttachment('network-gateway-connection', {
  internetGatewayId: gateway.id,
  vpcId: vpc.id,
});

const routeTable = new awsx.ec2.DefaultRouteTable('network-default-rt', {
  defaultRouteTableId: vpc.defaultRouteTableId,
  routes: [
    {
      cidrBlock: '0.0.0.0/0',
      gatewayId: gateway.id,
    },
  ],
});

new awsx.ec2.DefaultSecurityGroup('network-default-sg', {
  vpcId: vpc.id,
  ingress: [
    {
      cidrBlocks: ['0.0.0.0/0'],
      protocol: '-1',
      fromPort: 0,
      toPort: 0,
    },
  ],
  egress: [
    {
      cidrBlocks: ['0.0.0.0/0'],
      fromPort: 0,
      protocol: '-1',
      toPort: 0,
    },
  ],
});

const subnetA = new awsx.ec2.Subnet('network-subnet-a', {
  availabilityZoneId: 'euw3-az1',
  cidrBlock: '10.0.0.0/24',
  vpcId: vpc.id,
});
const subnetB = new awsx.ec2.Subnet('network-subnet-b', {
  availabilityZoneId: 'euw3-az2',
  cidrBlock: '10.0.64.0/24',
  vpcId: vpc.id,
});
const subnetC = new awsx.ec2.Subnet('network-subnet-c', {
  availabilityZoneId: 'euw3-az3',
  cidrBlock: '10.0.128.0/24',
  vpcId: vpc.id,
});

new awsx.ec2.DefaultNetworkAcl('network-default-acl', {
  defaultNetworkAclId: vpc.defaultNetworkAclId,
  ingress: [
    {
      protocol: '-1',
      ruleNo: 100,
      action: 'allow',
      cidrBlock: '0.0.0.0/0',
      fromPort: 0,
      toPort: 0,
    },
  ],
  egress: [
    {
      protocol: '-1',
      ruleNo: 100,
      action: 'allow',
      cidrBlock: '0.0.0.0/0',
      fromPort: 0,
      toPort: 0,
    },
  ],
  subnetIds: [subnetA.id, subnetB.id, subnetC.id],
});

new awsx.ec2.RouteTableAssociation('network-subnet-a-rt-association', {
  subnetId: subnetA.id,
  routeTableId: routeTable.id,
});
new awsx.ec2.RouteTableAssociation('network-subnet-b-rt-association', {
  subnetId: subnetB.id,
  routeTableId: routeTable.id,
});
new awsx.ec2.RouteTableAssociation('network-subnet-c-rt-association', {
  subnetId: subnetC.id,
  routeTableId: routeTable.id,
});

/** AUTOSCALING GROUP */

const ami = awsx.ec2.getAmiOutput({
  filters: [
    {
      name: 'name',
      values: ['amzn2-ami-ecs-hvm-2.0.*-x86_64-ebs'],
    },
  ],
  mostRecent: true,
  owners: ['amazon'],
});

const profile = awsx.iam.getInstanceProfileOutput({
  name: 'ecsInstanceRole',
});

const instanceTemplate = new awsx.ec2.LaunchTemplate('instance-template', {
  ebsOptimized: 'true',
  iamInstanceProfile: { arn: profile.arn },
  imageId: ami.apply((ami) => ami.id),
  instanceType: 't3a.nano',
  monitoring: {
    enabled: true,
  },
  networkInterfaces: [
    {
      associatePublicIpAddress: 'true',
    },
  ],
  updateDefaultVersion: true,
  userData: btoa(`#!/bin/bash
echo ECS_CLUSTER=production >> /etc/ecs/ecs.config`),
});

const asg = new awsx.autoscaling.Group('instance-cluster', {
  capacityRebalance: true,
  launchTemplate: { id: instanceTemplate.id },
  healthCheckGracePeriod: 30,
  maxInstanceLifetime: 60 * 60 * 24 * 7, // a week
  maxSize: 10,
  minSize: 3,
  vpcZoneIdentifiers: [subnetA.id, subnetB.id, subnetC.id],
});

const policyScaleOut = new awsx.autoscaling.Policy('policy-scale-out', {
  scalingAdjustment: 1,
  adjustmentType: 'ChangeInCapacity',
  cooldown: 120,
  autoscalingGroupName: asg.name,
});

const policyScaleIn = new awsx.autoscaling.Policy('policy-scale-in', {
  scalingAdjustment: -1,
  adjustmentType: 'ChangeInCapacity',
  cooldown: 120,
  autoscalingGroupName: asg.name,
});

/** LOAD BALANCER */

const targetGroup = new awsx.alb.TargetGroup('server-renderer-tg', {
  deregistrationDelay: 60,
  protocol: 'HTTP',
  port: 3000,
  healthCheck: {
    port: 'traffic-port',
  },
  vpcId: vpc.id,
});

const balancer = new awsx.alb.LoadBalancer('server-renderer-lb', {
  enableHttp2: true,
  internal: false,
  subnets: [subnetA.id, subnetB.id, subnetC.id],
});

new awsx.route53.Record('WWW', {
  aliases: [
    {
      name: balancer.dnsName,
      zoneId: balancer.zoneId,
      evaluateTargetHealth: true,
    },
  ],
  name: 'violetareed.com',
  type: 'A',
  zoneId: domain.zoneId,
});

new awsx.lb.Listener('http-listener', {
  loadBalancerArn: balancer.arn,
  port: 80,
  protocol: 'HTTP',
  defaultActions: [
    {
      type: 'redirect',
      redirect: {
        port: '443',
        protocol: 'HTTPS',
        statusCode: 'HTTP_301',
      },
    },
  ],
});

new awsx.lb.Listener('https-listener', {
  certificateArn: ssl.arn,
  defaultActions: [
    {
      type: 'forward',
      targetGroupArn: targetGroup.arn,
    },
  ],
  loadBalancerArn: balancer.arn,
  port: 443,
  protocol: 'HTTPS',
  sslPolicy: 'ELBSecurityPolicy-2016-08',
});

/** ECS */

const role = awsx.iam.getRoleOutput({ name: 'ecsTaskExecutionRole' });

new awsx.ecr.Repository('server-renderer-repo', {
  name: 'server-renderer',
});

const taskTemplate = new awsx.ecs.TaskDefinition('server-renderer-template', {
  containerDefinitions: JSON.stringify([
    {
      cpu: 256,
      essential: true,
      image: '826353843014.dkr.ecr.eu-west-3.amazonaws.com/server-renderer:latest',
      logConfiguration: {
        logDriver: 'awslogs',
        options: {
          'awslogs-group': '/ecs/server-renderer',
          'awslogs-region': 'eu-west-3',
          'awslogs-stream-prefix': 'ecs',
        },
      },
      memory: 128,
      name: 'first',
      portMappings: [
        {
          hostPort: 0,
          protocol: 'tcp',
          containerPort: 3000,
        },
      ],
      runtimePlatform: {
        operatingSystemFamily: 'LINUX',
      },
    },
  ]),
  executionRoleArn: role.arn,
  family: 'server-renderer',
  requiresCompatibilities: ['EC2'],
});

const cluster = new awsx.ecs.Cluster('task-cluster', {
  name: 'production',
  settings: [
    {
      name: 'containerInsights',
      value: 'enabled',
    },
  ],
});

new awsx.ecs.Service('server-renderer-service', {
  cluster: cluster.arn,
  desiredCount: 3,
  forceNewDeployment: true,
  loadBalancers: [
    {
      targetGroupArn: targetGroup.arn,
      containerName: taskTemplate.containerDefinitions.apply((definition) => {
        const [container] = JSON.parse(definition);
        return container.name;
      }),
      containerPort: 3000,
    },
  ],
  name: 'server-renderer',
  orderedPlacementStrategies: [
    {
      type: 'binpack',
      field: 'cpu',
    },
  ],
  taskDefinition: taskTemplate.arn,
});

const target = new awsx.appautoscaling.Target('task-number', {
  maxCapacity: 24,
  minCapacity: 3,
  resourceId: 'service/production/server-renderer',
  scalableDimension: 'ecs:service:DesiredCount',
  serviceNamespace: 'ecs',
});

const appPolicyScaleIn = new awsx.appautoscaling.Policy('app-policy-scale-in', {
  policyType: 'StepScaling',
  resourceId: target.resourceId,
  scalableDimension: target.scalableDimension,
  serviceNamespace: target.serviceNamespace,
  stepScalingPolicyConfiguration: {
    adjustmentType: 'ChangeInCapacity',
    cooldown: 30,
    metricAggregationType: 'Maximum',
    stepAdjustments: [
      {
        metricIntervalUpperBound: '0',
        scalingAdjustment: -1,
      },
    ],
  },
});

const appPolicyScaleOut = new awsx.appautoscaling.Policy('app-policy-scale-out', {
  policyType: 'StepScaling',
  resourceId: target.resourceId,
  scalableDimension: target.scalableDimension,
  serviceNamespace: target.serviceNamespace,
  stepScalingPolicyConfiguration: {
    adjustmentType: 'ChangeInCapacity',
    cooldown: 30,
    metricAggregationType: 'Maximum',
    stepAdjustments: [
      {
        metricIntervalUpperBound: '0',
        scalingAdjustment: 1,
      },
    ],
  },
});

/** ALARMS */

new awsx.cloudwatch.MetricAlarm('memory-reservation-low', {
  alarmActions: [policyScaleOut.arn],
  comparisonOperator: 'GreaterThanOrEqualToThreshold',
  dimensions: {
    ClusterName: cluster.name,
  },
  evaluationPeriods: 3,
  metricName: 'MemoryReservation',
  namespace: 'AWS/ECS',
  period: 120,
  statistic: 'Average',
  threshold: 40,
});

new awsx.cloudwatch.MetricAlarm('memory-reservation-high', {
  alarmActions: [policyScaleIn.arn],
  comparisonOperator: 'LessThanThreshold',
  dimensions: {
    ClusterName: cluster.name,
  },
  evaluationPeriods: 3,
  metricName: 'MemoryReservation',
  namespace: 'AWS/ECS',
  period: 120,
  statistic: 'Average',
  threshold: 20,
});

new awsx.cloudwatch.MetricAlarm('request-count-high', {
  alarmActions: [appPolicyScaleOut.arn],
  comparisonOperator: 'GreaterThanOrEqualToThreshold',
  dimensions: {
    LoadBalancer: balancer.arnSuffix,
    TargetGroup: targetGroup.arnSuffix,
  },
  evaluationPeriods: 3,
  metricName: 'RequestCountPerTarget',
  namespace: 'AWS/ApplicationELB',
  period: 60,
  statistic: 'Average',
  threshold: 40,
});

new awsx.cloudwatch.MetricAlarm('request-count-low', {
  alarmActions: [appPolicyScaleIn.arn],
  comparisonOperator: 'LessThanThreshold',
  dimensions: {
    LoadBalancer: balancer.arnSuffix,
    TargetGroup: targetGroup.arnSuffix,
  },
  evaluationPeriods: 3,
  metricName: 'RequestCountPerTarget',
  namespace: 'AWS/ApplicationELB',
  period: 60,
  statistic: 'Average',
  threshold: 20,
});
