import S3 from 'aws-sdk/clients/s3';
import env from './utils/validateEnv';
import fs from 'fs';

const s3 = new S3({
   region: env.AWS_BUCKET_REGION,
   accessKeyId: env.AWS_ACCESS_KEY,
   secretAccessKey: env.AWS_SECRET_KEY,
});

const baseUrl = `https://${env.AWS_BUCKET_NAME}.s3.amazonaws.com/`;

export const upload = async (file: Express.Multer.File) => {
   const fileStream = fs.createReadStream(file.path);

   const uploadParams = {
      Bucket: env.AWS_BUCKET_NAME,
      Body: fileStream,
      Key: file.filename,
   };

   try {
      return await s3.upload(uploadParams).promise();
   } catch (error) {
      console.error('Error uploading object:', error);
      throw error;
   }
};
export const uploadMultiple = async (files: Express.Multer.File[]): Promise<string[]> => {
   const uploadPromises = files.map(file => {
      const fileStream = fs.createReadStream(file.path);
      const params = {
         Bucket: env.AWS_BUCKET_NAME,
         Body: fileStream,
         Key: file.filename,
      };

      return new Promise<string>((resolve, reject) => {
         s3.upload(params, (err: any, data: any) => {
            if (err) {
               reject(err);
            } else {
               resolve(data.Location);
            }
         });
      });
   });

   return Promise.all(uploadPromises);
};
export const download = (file: string) => {
   const donwloadParams = {
      Key: file,
      Bucket: env.AWS_BUCKET_NAME,
   };

   return s3.getObject(donwloadParams).createReadStream();
};

export const remove = async (file: string) => {
   const key = file.replace(baseUrl, '');

   const removeParams = {
      Key: key,
      Bucket: env.AWS_BUCKET_NAME,
   };
   try {
      await s3.deleteObject(removeParams).promise();
   } catch (error) {
      console.error('Error deleting object:', error);
      throw error;
   }
};
