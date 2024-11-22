import { Document, Schema } from 'mongoose';
import { IUsers } from '../interfaces';
import { ERoles } from '@app/common/enums/roles';
import { BaseSchema } from '@app/common/schemas/base.schema';
import { schemaOptions } from '@app/common/schemas/Model';

export type UserDocument = IUsers & Document;

export const UserSchema: Schema = new Schema<UserDocument>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    role: { type: String, enum: Object.values(ERoles), required: true },
    email: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    active: { type: Boolean, default: true },
    birth_date: { type: String, required: true },
    calling_code: { type: String, required: true },
    phone: { type: Number, required: true },
    balance: { type: Number, required: true },
    platforms: [
      {
        name: { type: String, required: true },
        platform_id: { type: String, required: true },
      },
    ],
    ...BaseSchema,
  },
  { ...schemaOptions, collection: 'users' },
);
