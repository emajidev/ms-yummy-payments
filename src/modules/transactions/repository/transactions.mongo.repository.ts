import { Document, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { ITransactions } from '../interfaces';
import { MongoRepository } from '@app/common/repositories/mongo.repository';

export type transactionsDocument = ITransactions & Document;

@Injectable()
export class TransactionsMongoRepository extends MongoRepository<transactionsDocument> {
  constructor(
    @InjectModel('transactions')
    private transactionsModel: Model<transactionsDocument>,
  ) {
    super(transactionsModel);
  }
  async findAll(query = {}) {
    return this.transactionsModel.find(query);
  }
}
