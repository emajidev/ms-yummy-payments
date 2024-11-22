import { BaseSchema } from '@app/common/schemas/base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountDocument = Accounts & Document;

@Schema()
class PlatformsSchema extends BaseSchema {
  @Prop({ required: true })
  name: string;
  @Prop()
  password: string;
}

@Schema({ versionKey: false })
export class Accounts {
  @Prop()
  platforms: PlatformsSchema[];
  @Prop()
  email: string;
}

export const AccountsSchema = SchemaFactory.createForClass(Accounts);
