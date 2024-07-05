import Transaction from '../models/TransactionModel';
import * as handler from './../utils/handleControllers';

export default class TransactionController {
   public createTransaction = handler.createOne(Transaction);
}
