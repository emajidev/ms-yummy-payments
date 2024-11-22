import { Types } from 'mongoose';

export interface IOtp {
  _id?: Types.ObjectId;
  code: string;
  user_id: Types.ObjectId;
  transaction_id: Types.ObjectId;
  used: boolean;
  created_at?: Date;
  updated_at?: Date;
}
