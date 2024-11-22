import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

const schemaOptions: mongoose.SchemaOptions = {
  versionKey: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
const schemaBase = {
  created_by: {
    type: Schema.Types.ObjectId,
  },
  created_at: {
    type: Schema.Types.Date,
    default: new Date(),
  },
  updated_at: {
    type: Schema.Types.Date,
    default: new Date(),
  },
  deleted_at: {
    type: Schema.Types.Date,
  },
};

export { schemaOptions, mongoose, Schema, schemaBase };
