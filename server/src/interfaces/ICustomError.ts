export default interface ICustomError {
   status?: string;
   isOperational?: boolean;
   code?: number | undefined;
   message?: any;
   statusCode?: number;
   name?: string;
   stack?: string | undefined;
   errmsg?: string;
   path?: any;
   value?: any;
   keyValue?: any;
}
