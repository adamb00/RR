import S3 from 'aws-sdk/clients/s3';
import env from './utils/validateEnv';
import fs from 'fs';

const s3 = new S3({
   region: env.AWS_BUCKET_REGION,
   accessKeyId: env.AWS_ACCESS_KEY,
   secretAccessKey: env.AWS_SECRET_KEY,
});

export const upload = (file: Express.Multer.File) => {
   const fileStream = fs.createReadStream(file.path);
   const uploadParams = {
      Bucket: env.AWS_BUCKET_NAME,
      Body: fileStream,
      Key: file.filename,
   };

   return s3.upload(uploadParams).promise();
};
export const download = (file: string) => {
   const donwloadParams = {
      Key: file,
      Bucket: env.AWS_BUCKET_NAME,
   };

   return s3.getObject(donwloadParams).createReadStream();
};

export const remove = (file: string) => {
   const removeParams = {
      Key: file,
      Bucket: env.AWS_BUCKET_NAME,
   };

   return s3.deleteObject(removeParams).promise();
};
