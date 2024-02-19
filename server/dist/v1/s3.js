"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.download = exports.upload = void 0;
const s3_1 = __importDefault(require("aws-sdk/clients/s3"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const fs_1 = __importDefault(require("fs"));
const s3 = new s3_1.default({
    region: validateEnv_1.default.AWS_BUCKET_REGION,
    accessKeyId: validateEnv_1.default.AWS_ACCESS_KEY,
    secretAccessKey: validateEnv_1.default.AWS_SECRET_KEY,
});
const upload = (file) => {
    const fileStream = fs_1.default.createReadStream(file.path);
    const uploadParams = {
        Bucket: validateEnv_1.default.AWS_BUCKET_NAME,
        Body: fileStream,
        Key: file.filename,
    };
    return s3.upload(uploadParams).promise();
};
exports.upload = upload;
const download = (file) => {
    const donwloadParams = {
        Key: file,
        Bucket: validateEnv_1.default.AWS_BUCKET_NAME,
    };
    return s3.getObject(donwloadParams).createReadStream();
};
exports.download = download;
//# sourceMappingURL=s3.js.map