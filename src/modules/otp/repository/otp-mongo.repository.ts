import { Document, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { IOtp } from '../interfaces';
import { MongoRepository } from '@app/common/repositories/mongo.repository';

export type otpDocument = IOtp & Document;

@Injectable()
export class OtpMongoRepository extends MongoRepository<otpDocument> {
  constructor(
    @InjectModel('otps')
    private otpModel: Model<otpDocument>,
  ) {
    super(otpModel);
  }
  async findAll(query = {}) {
    return this.otpModel.find(query);
  }
}
