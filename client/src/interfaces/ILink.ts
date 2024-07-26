export interface ILink {
   _id: string;
   link: string;
   createdAt: Date;
   active: boolean;
   title: string;
   order: number;
   images: string[];
   isPreview: boolean;
   description: string;
   createdBy: string;
   video: string;
}
