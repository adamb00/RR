import { Query, Document, Types } from 'mongoose';
import { ParsedQs } from 'qs';

export default class APIFeatures<T extends Document> {
   constructor(
      public query: Query<T[], Document<unknown, {}, T> & T & { _id: Types.ObjectId }, {}, T>,
      public queryString: ParsedQs
   ) {}

   public filter(): APIFeatures<T> {
      const queryObject = { ...this.queryString };
      const excludedFields = ['page', 'sort', 'limit', 'fields'];
      excludedFields.forEach(el => delete queryObject[el]);

      let queryStr = JSON.stringify(queryObject);

      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

      this.query = this.query.find(JSON.parse(queryStr));

      return this;
   }

   public sort(): APIFeatures<T> {
      if (this.queryString.sort) {
         const sortBy = this.queryString.sort.toString().split(',').join(' ');
         this.query = this.query.sort(sortBy);
      } else {
         this.query = this.query.sort('-createdAt');
      }
      return this;
   }

   public limitFields(): APIFeatures<T> {
      if (this.queryString.fields) {
         const fields = this.queryString.fields.toString().split(',').join(' ');
         this.query = this.query.select(fields);
      } else {
         this.query = this.query.select('-__v');
      }
      return this;
   }

   public paginate(): APIFeatures<T> {
      const page = parseInt(this.queryString.page as string) || 1;
      const limit = parseInt(this.queryString.limit as string) || 100;
      const skip = (page - 1) * limit;

      this.query = this.query.skip(skip).limit(limit);

      return this;
   }
}
