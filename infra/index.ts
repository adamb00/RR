import * as pulumi from '@pulumi/pulumi';
import * as digitalocean from '@pulumi/digitalocean';

// Our stack-specific configuration.
const config = new pulumi.Config();
const repo = config.require('repo');
const branch = config.require('branch');

const mongoPassword = config.requireSecret('MONGO_PWD'); // Retrieve secret value
const emailClientSecret = config.requireSecret('EMAIL_CLIENT_SECRET'); // Retrieve secret value
const emailRefreshToken = config.requireSecret('EMAIL_REFRESH_TOKEN'); // Retrieve secret value
const emailAccessToken = config.requireSecret('EMAIL_ACCESS_TOKEN'); // Retrieve secret value
const awsSecretKey = config.requireSecret('AWS_SECRET_KEY'); // Retrieve secret value

// The DigitalOcean region to deploy into.
const region = digitalocean.Region.FRA1;

// const dropletIp = '165.227.173.40';

// const domainName = config.require('domainName');

// The App Platform spec that defines our grocery list.
const app = new digitalocean.App('app', {
   spec: {
      name: 'r2byou',
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
            sourceDir: '/client',
            buildCommand: 'npm install && npm run build && cp -R assets dist',
            outputDir: '/dist',
            envs: [
               { key: 'VITE_NODE_ENV', scope: 'RUN_AND_BUILD_TIME', value: 'production' },
               { key: 'VITE_FACEBOOK_APP_ID', scope: 'RUN_AND_BUILD_TIME', value: '3092655644205329' },
               { key: 'VITE_BASE_URL_SOCKET', scope: 'RUN_AND_BUILD_TIME', value: 'https://r2byou.com:8000' },
               { key: 'VITE_BASE_URL', scope: 'RUN_AND_BUILD_TIME', value: 'https://r2byou.com:8000/api/v1/' },
               { key: 'VITE_BASE_URL_LINK', scope: 'RUN_AND_BUILD_TIME', value: 'https://r2byou.com/' },
            ],
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
            sourceDir: '/server',
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
            instanceCount: 1,

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
               { key: 'BASE_URL', scope: 'RUN_AND_BUILD_TIME', value: 'https://r2byou.com:3000' },
            ],
         },
      ],
   },
});

// export const domain = new digitalocean.Domain(domainName, {
//    name: domainName,
//    ipAddress: dropletIp,
// });

// The DigitalOcean-assigned URL for our app.
export const { liveUrl } = app;
