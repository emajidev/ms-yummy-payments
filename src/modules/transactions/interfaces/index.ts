import { Types } from 'mongoose';
import { EStatusTransactions } from '../enums';

export interface ITransactions {
  _id?: Types.ObjectId;
  description: string;
  amount: number;
  payer: Types.ObjectId;
  collector: Types.ObjectId;
  status: EStatusTransactions;
  paid_at?: Date;
}
