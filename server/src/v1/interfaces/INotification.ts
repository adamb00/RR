export default interface INotification {
   title: string;
   message: string;
   read: boolean;
   created_at: Date;
   created_by: string;
   _id: string;
}
