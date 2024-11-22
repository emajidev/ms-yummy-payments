import { BaseSchema } from '@app/common/schemas/base.schema';
import { Schema } from 'mongoose';
import { IOtp } from '../interfaces';

export const OtpSchema: Schema = new Schema<IOtp>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    code: { type: String, required: true },
    transaction_id: { type: Schema.Types.ObjectId, required: true },
    user_id: { type: Schema.Types.ObjectId, required: true },
    used: {
      type: Boolean,
      required: true,
      default: false,
    },
    ...BaseSchema,
  },
  { collection: 'otps' },
);
