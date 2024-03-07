export interface ILink {
   _id: string;
   link: string;
   createdAt: Date;
   active: boolean;
   title: string;
   order: number;
   image: string;
   isPreview: boolean;
   description: string;
   createdBy: string;
}
