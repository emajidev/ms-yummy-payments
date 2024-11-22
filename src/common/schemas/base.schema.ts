import { Type } from 'class-transformer';
import { Prop, Schema } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

@Schema({ versionKey: false })
export class BaseSchema {
  @Type(() => Types.ObjectId)
  @IsNotEmpty()
  created_by: Types.ObjectId;
  @Prop({ default: new Date().toISOString() })
  created_at: string;
  @Prop()
  updated_at: string;
  @Prop()
  deleted_at: string;
}
