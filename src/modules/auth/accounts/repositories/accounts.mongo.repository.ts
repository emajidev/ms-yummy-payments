import { Document, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { IAccounts } from '../interfaces';
import { Accounts } from '../schemas/account.schema';
import { MongoRepository } from '@app/common/repositories/mongo.repository';

export type AccountsDocument = IAccounts & Document;

@Injectable()
export class AccountsMongoRepository extends MongoRepository<AccountsDocument> {
  constructor(
    @InjectModel(Accounts.name)
    private readonly accountsModel: Model<AccountsDocument>,
  ) {
    super(accountsModel);
  }
  async findAll() {
    return this.accountsModel.find({});
  }
}
