import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

export const toMongoObjectId = ({ value, key }): Types.ObjectId => {
  if (
    Types.ObjectId.isValid(value) &&
    new Types.ObjectId(String(value)).toString() === value
  ) {
    return new Types.ObjectId(String(value));
  } else {
    throw new BadRequestException(`${key} is not a valid MongoId`);
  }
};
