import { Document, Schema } from 'mongoose';
import { ITransactions } from '../interfaces';
import { EStatusTransactions } from '../enums';
import { BaseSchema } from '@app/common/schemas/base.schema';
import { schemaOptions } from '@app/common/schemas/Model';

export type TransactionsDocument = ITransactions & Document;

export const TransactionsSchema: Schema = new Schema<ITransactions>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    payer: { type: Schema.ObjectId, required: true },
    collector: { type: Schema.ObjectId, required: true },
    paid_at: { type: Date },
    status: {
      type: String,
      enum: Object.values(EStatusTransactions),
      default: EStatusTransactions.Pending,
      required: true,
    },
    ...BaseSchema,
  },
  { ...schemaOptions, collection: 'transactions' },
);
