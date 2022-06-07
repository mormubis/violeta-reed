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

/** NETWORK */
const vpc = new awsx.ec2.Vpc('network', { cidrBlock: '10.0.0.0/16' });

const gateway = new awsx.ec2.InternetGateway('internet-gateway');

new awsx.ec2.InternetGatewayAttachment('network-gateway-connection', {
  internetGatewayId: gateway.id,
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
      protocol: '-1',
      self: true,
      fromPort: 0,
      toPort: 0,
    },
  ],
  egress: [
    {
      cidrBlocks: ['0.0.0.0/0'],
      fromPort: 0,
      toPort: 0,
      protocol: '-1',
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

const template = new awsx.ec2.LaunchTemplate('instance-template', {
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

new awsx.autoscaling.Group('instance-cluster', {
  capacityRebalance: true,
  launchTemplate: { id: template.id },
  healthCheckGracePeriod: 30,
  maxInstanceLifetime: 60 * 60 * 24 * 7, // a week
  maxSize: 10,
  minSize: 1,
  vpcZoneIdentifiers: [subnetA.id, subnetB.id, subnetC.id],
});

/** ECS */

const role = awsx.iam.getRoleOutput({ name: 'ecsTaskExecutionRole' });

new awsx.ecr.Repository('server-renderer-repo', {
  name: 'server-renderer',
});

new awsx.ecs.TaskDefinition('server-renderer-template', {
  containerDefinitions: JSON.stringify([
    {
      cpu: 10,
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
      memory: 512,
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
  networkMode: 'bridge',
  requiresCompatibilities: ['EC2'],
});

new awsx.ecs.Cluster('task-cluster', {
  name: 'production',
  settings: [
    {
      name: 'containerInsights',
      value: 'enabled',
    },
  ],
});
