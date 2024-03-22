import * as pulumi from '@pulumi/pulumi';
import * as digitalocean from '@pulumi/digitalocean';

// Our stack-specific configuration.
const config = new pulumi.Config();
const repo = config.require('repo');
const branch = config.require('branch');
const mongoPassword = config.requireSecret('MONGO_PWD');
const emailClientSecret = config.requireSecret('EMAIL_CLIENT_SECRET');
const emailRefreshToken = config.requireSecret('EMAIL_REFRESH_TOKEN');
const emailAccessToken = config.requireSecret('EMAIL_ACCESS_TOKEN');
const awsSecretKey = config.requireSecret('AWS_SECRET_KEY');
const serviceInstanceCount = config.requireNumber('service_instance_count');

// The DigitalOcean region to deploy into.
const region = digitalocean.Region.SFO3;

// The App Platform spec that defines our grocery list.
const app = new digitalocean.App('app', {
   spec: {
      name: 'rr-app',
      region: region,

      // The React front end.
      staticSites: [
         {
            name: 'frontend',
            github: {
               repo,
               branch,
               deployOnPush: true,
            },
            sourceDir: './client',
            buildCommand: 'npm install && npm run build',
            outputDir: '/dist',
         },
      ],

      // The Express back end.
      services: [
         {
            name: 'backend',
            github: {
               repo,
               branch,
               deployOnPush: true,
            },
            sourceDir: './server',
            buildCommand: 'npm install && npm run build',
            runCommand: 'npm start',
            httpPort: 8000,
            routes: [
               {
                  path: '/api',
                  preservePathPrefix: true,
               },
            ],
            instanceSizeSlug: 'basic-xxs',
            instanceCount: serviceInstanceCount,

            envs: [
               { key: 'PORT', scope: 'RUN_AND_BUILD_TIME', value: '8000' },
               { key: 'NODE_ENV', scope: 'RUN_AND_BUILD_TIME', value: 'prod' },
               { key: 'VERSION', scope: 'RUN_AND_BUILD_TIME', value: 'v1' },
               { key: 'MONGO_PWD', scope: 'RUN_AND_BUILD_TIME', value: mongoPassword },
               {
                  key: 'MONGO_DB',
                  scope: 'RUN_AND_BUILD_TIME',
                  value: 'mongodb+srv://borsodidm:<PASSWORD>@rr.ppybv9b.mongodb.net/rr?retryWrites=true&w=majority',
               },
               { key: 'EMAIL_USERNAME', scope: 'RUN_AND_BUILD_TIME', value: 'Borsodi Adam' },
               { key: 'EMAIL_PASSWORD', scope: 'RUN_AND_BUILD_TIME', value: 'f418w6er' },
               { key: 'EMAIL_FROM', scope: 'RUN_AND_BUILD_TIME', value: 'borsodi.dm@gmail.com' },
               { key: 'EMAIL_HOST', scope: 'RUN_AND_BUILD_TIME', value: 'smtp.gmail.com' },
               { key: 'EMAIL_PORT', scope: 'RUN_AND_BUILD_TIME', value: '465' },
               {
                  key: 'EMAIL_CLIENT_ID',
                  scope: 'RUN_AND_BUILD_TIME',
                  value: '1077382016406-hseup3f823n22euho4gtk012qiotiibs.apps.googleusercontent.com',
               },
               { key: 'EMAIL_CLIENT_SECRET', scope: 'RUN_AND_BUILD_TIME', value: emailClientSecret },
               { key: 'EMAIL_REFRESH_TOKEN', scope: 'RUN_AND_BUILD_TIME', value: emailRefreshToken },
               { key: 'EMAIL_ACCESS_TOKEN', scope: 'RUN_AND_BUILD_TIME', value: emailAccessToken },
               { key: 'JWT_SECRET', scope: 'RUN_AND_BUILD_TIME', value: 'my-ultra-secure-and-ultra-long-secret' },
               { key: 'JWT_EXPIRES_IN', scope: 'RUN_AND_BUILD_TIME', value: '90m' },
               { key: 'AWS_BUCKET_NAME', scope: 'RUN_AND_BUILD_TIME', value: 'rr-bucket-storage' },
               { key: 'AWS_BUCKET_REGION', scope: 'RUN_AND_BUILD_TIME', value: 'us-east-1' },
               { key: 'AWS_ACCESS_KEY', scope: 'RUN_AND_BUILD_TIME', value: 'AKIA3MBAYGAYQA2RKFUX' },
               { key: 'AWS_SECRET_KEY', scope: 'RUN_AND_BUILD_TIME', value: awsSecretKey },
               { key: 'BASE_URL', scope: 'RUN_AND_BUILD_TIME', value: 'http://localhost:3000' },
            ],
         },
      ],
   },
});

// The DigitalOcean-assigned URL for our app.
export const { liveUrl } = app;
