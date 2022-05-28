import * as aws from '@pulumi/aws';
// import * as awsx from '@pulumi/awsx';
// import * as pulumi from '@pulumi/pulumi';
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

const domain = new aws.route53.Zone('violetareed.com', { comment: 'Violeta Reed Website' });

domain.nameServers.apply((nameservers) => {
  nameservers.forEach(async (ns: string, index: number) => {
    new aws.route53.Record(NS[index], {
      name: NS[index],
      records: [await resolve(ns)],
      ttl: 60 * 60, // 1 hour
      type: 'A',
      zoneId: domain.zoneId,
    });
  });
});

new aws.route53.Record('NS', {
  allowOverwrite: true,
  name: '',
  records: NS.map((ns) => `${ns}.violetareed.com`),
  ttl: 24 * 60 * 60, // 1 day
  type: 'NS',
  zoneId: domain.zoneId,
});

new aws.route53.Record('SOA', {
  allowOverwrite: true,
  name: '',
  records: ['book.violetareed.com. postmaster.violetareed.com. 1 7200 900 1209600 86400'],
  ttl: 900,
  type: 'SOA',
  zoneId: domain.zoneId,
});

const registry = new aws.ecr.Repository('image');

const serverFn = new aws.lambda.Function('server', {
  imageUri: registry.repositoryUrl.apply((urn) => `${urn}:latest`),
  packageType: 'Image',
  role: 'arn:aws:iam::826353843014:role/server-role',
});

new aws.lambda.FunctionUrl('server-url', {
  functionName: serverFn.arn,
  authorizationType: 'NONE',
});
