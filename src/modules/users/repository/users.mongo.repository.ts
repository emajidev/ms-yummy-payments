import { Document, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { IUsers } from '../interfaces';
import { MongoRepository } from '@app/common/repositories/mongo.repository';
import { IRepository } from '@app/common/repositories';

export type UsersDocument = IUsers & Document;

@Injectable()
export class UsersMongoRepository
  extends MongoRepository<UsersDocument>
  implements IRepository
{
  constructor(
    @InjectModel('users')
    private usersModel: Model<UsersDocument>,
  ) {
    super(usersModel);
  }
  async findAll(query = {}) {
    return this.usersModel.find(query);
  }
}
