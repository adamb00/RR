"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const envalid_1 = require("envalid");
exports.default = (0, envalid_1.cleanEnv)(process.env, {
    PORT: (0, envalid_1.port)(),
    NODE_ENV: (0, envalid_1.str)(),
    MONGO_PWD: (0, envalid_1.str)(),
    MONGO_DB: (0, envalid_1.str)(),
    VERSION: (0, envalid_1.str)(),
    EMAIL_FROM: (0, envalid_1.str)(),
    EMAIL_USERNAME: (0, envalid_1.str)(),
    EMAIL_PASSWORD: (0, envalid_1.str)(),
    EMAIL_HOST: (0, envalid_1.str)(),
    EMAIL_PORT: (0, envalid_1.num)(),
    JWT_SECRET: (0, envalid_1.str)(),
    JWT_EXPIRES_IN: (0, envalid_1.str)(),
    FACEBOOK_ID: (0, envalid_1.str)(),
    FACEBOOK_SECRET: (0, envalid_1.str)(),
    FACEBOOK_CALLBACK_URL: (0, envalid_1.str)(),
    AWS_BUCKET_NAME: (0, envalid_1.str)(),
    AWS_BUCKET_REGION: (0, envalid_1.str)(),
    AWS_ACCESS_KEY: (0, envalid_1.str)(),
    AWS_SECRET_KEY: (0, envalid_1.str)(),
});
//# sourceMappingURL=validateEnv.js.map