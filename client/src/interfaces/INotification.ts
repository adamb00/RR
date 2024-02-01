export default interface INotification {
   read: boolean;
   title: string;
   message: string;
   created_at: Date;
   created_by: string;
   _id: string;
}
