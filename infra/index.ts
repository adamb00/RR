import * as pulumi from '@pulumi/pulumi';
import * as digitalocean from '@pulumi/digitalocean';

// Our stack-specific configuration.
const config = new pulumi.Config();
const repo = config.require('repo');
const branch = config.require('branch');

const mongoDB = config.requireSecret('MONGO_DB');
const mongoPassword = config.requireSecret('MONGO_PWD');
const emailClientSecret = config.requireSecret('EMAIL_CLIENT_SECRET');
const emailRefreshToken = config.requireSecret('EMAIL_REFRESH_TOKEN');
const emailAccessToken = config.requireSecret('EMAIL_ACCESS_TOKEN');
const emailClientId = config.requireSecret('EMAIL_CLIENT_ID');

const awsSecretKey = config.requireSecret('AWS_SECRET_KEY');
const awsBucketName = config.requireSecret('AWS_BUCKET_NAME');
const awsBucketRegion = config.requireSecret('AWS_BUCKET_REGION');
const awsAccessKey = config.requireSecret('AWS_ACCESS_KEY');

const backendPort = config.requireSecret('PORT');
const backendVersion = config.requireSecret('VERSION');
const backendNodeENV = config.requireSecret('NODE_ENV');
const baseURL = config.requireSecret('BASE_URL');

const emailUsername = config.requireSecret('EMAIL_USERNAME');
const emailPassword = config.requireSecret('EMAIL_PASSWORD');
const emailFrom = config.requireSecret('EMAIL_FROM');
const emailHost = config.requireSecret('EMAIL_HOST');
const emailPort = config.requireSecret('EMAIL_PORT');

const jwtSecret = config.requireSecret('JWT_SECRET');
const jwtExpires = config.requireSecret('JWT_EXPIRES_IN');

const viteNodeEnv = config.requireSecret('VITE_NODE_ENV');
const viteFacebookAppId = config.requireSecret('VITE_FACEBOOK_APP_ID');
const viteBaseUrlSocket = config.requireSecret('VITE_BASE_URL_SOCKET');
const viteBaseUrl = config.requireSecret('VITE_BASE_URL');
const viteBaseUrlLink = config.requireSecret('VITE_BASE_URL_LINK');

// The DigitalOcean region to deploy into.
const region = digitalocean.Region.FRA1;

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
               { key: 'VITE_NODE_ENV', scope: 'RUN_AND_BUILD_TIME', value: viteNodeEnv },
               { key: 'VITE_FACEBOOK_APP_ID', scope: 'RUN_AND_BUILD_TIME', value: viteFacebookAppId },
               { key: 'VITE_BASE_URL_SOCKET', scope: 'RUN_AND_BUILD_TIME', value: 'https://r2byou.com/' },
               { key: 'VITE_BASE_URL', scope: 'RUN_AND_BUILD_TIME', value: viteBaseUrl },
               { key: 'VITE_BASE_URL_LINK', scope: 'RUN_AND_BUILD_TIME', value: viteBaseUrlLink },
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
               { key: 'PORT', scope: 'RUN_AND_BUILD_TIME', value: backendPort },
               { key: 'NODE_ENV', scope: 'RUN_AND_BUILD_TIME', value: backendNodeENV },
               { key: 'VERSION', scope: 'RUN_AND_BUILD_TIME', value: backendVersion },
               { key: 'MONGO_PWD', scope: 'RUN_AND_BUILD_TIME', value: mongoPassword },
               {
                  key: 'MONGO_DB',
                  scope: 'RUN_AND_BUILD_TIME',
                  value: mongoDB,
               },
               { key: 'EMAIL_USERNAME', scope: 'RUN_AND_BUILD_TIME', value: emailUsername },
               { key: 'EMAIL_PASSWORD', scope: 'RUN_AND_BUILD_TIME', value: emailPassword },
               { key: 'EMAIL_FROM', scope: 'RUN_AND_BUILD_TIME', value: emailFrom },
               { key: 'EMAIL_HOST', scope: 'RUN_AND_BUILD_TIME', value: emailHost },
               { key: 'EMAIL_PORT', scope: 'RUN_AND_BUILD_TIME', value: emailPort },
               {
                  key: 'EMAIL_CLIENT_ID',
                  scope: 'RUN_AND_BUILD_TIME',
                  value: emailClientId,
               },
               { key: 'EMAIL_CLIENT_SECRET', scope: 'RUN_AND_BUILD_TIME', value: emailClientSecret },
               { key: 'EMAIL_REFRESH_TOKEN', scope: 'RUN_AND_BUILD_TIME', value: emailRefreshToken },
               { key: 'EMAIL_ACCESS_TOKEN', scope: 'RUN_AND_BUILD_TIME', value: emailAccessToken },
               { key: 'JWT_SECRET', scope: 'RUN_AND_BUILD_TIME', value: jwtSecret },
               { key: 'JWT_EXPIRES_IN', scope: 'RUN_AND_BUILD_TIME', value: jwtExpires },
               { key: 'AWS_BUCKET_NAME', scope: 'RUN_AND_BUILD_TIME', value: awsBucketName },
               { key: 'AWS_BUCKET_REGION', scope: 'RUN_AND_BUILD_TIME', value: awsBucketRegion },
               { key: 'AWS_ACCESS_KEY', scope: 'RUN_AND_BUILD_TIME', value: awsAccessKey },
               { key: 'AWS_SECRET_KEY', scope: 'RUN_AND_BUILD_TIME', value: awsSecretKey },
               { key: 'BASE_URL', scope: 'RUN_AND_BUILD_TIME', value: 'https://r2byou.com/' },
            ],
         },
      ],
   },
});

export const { liveUrl } = app;
