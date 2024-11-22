import { Document, FilterQuery, Model, PipelineStage, Types } from 'mongoose';
import { FilterPaginationQuery } from '../middleware/req-filterpaginate.middleware';
import { BaseRepository } from './repository';

export abstract class MongoRepository<
  T extends Document,
> extends BaseRepository<T> {
  constructor(protected entityModel: Model<T>) {
    super();
  }

  async create(data: T | Partial<T>): Promise<T> {
    const entity = new this.entityModel(data);

    return entity.save();
  }

  async findOne(filter: FilterQuery<T>): Promise<T> {
    return this.entityModel.findOne(filter).lean() as Promise<T>;
  }

  async findOneAndUpdate(
    filter: FilterQuery<T>,
    data: FilterQuery<T>,
  ): Promise<T> {
    return this.entityModel.findOneAndUpdate(filter, data, {
      new: true,
    });
  }

  async findByIdAndUpdate(id: Types.ObjectId, data: Partial<T>): Promise<T> {
    return this.entityModel.findByIdAndUpdate(id, data, { new: true });
  }

  async findById(id: Types.ObjectId): Promise<T> {
    return this.entityModel.findById(id).lean() as Promise<T>;
  }

  async aggregate(pipeline: PipelineStage[]): Promise<T[]> {
    return this.entityModel.aggregate(pipeline);
  }

  async find(filter: FilterQuery<T>): Promise<T[]> {
    return this.entityModel.find(filter).lean() as Promise<T[]>;
  }

  async count(filter: FilterPaginationQuery): Promise<number> {
    return this.entityModel.countDocuments(filter.mongoQuery);
  }

  async paginate(filter: FilterPaginationQuery): Promise<T[]> {
    filter.page = filter.page > 0 ? filter.page : 1;
    try {
      const fields = filter.fields.length
        ? filter.fields.replace(/\s/g, '').replace(/,/g, ' ')
        : '';
      return this.entityModel
        .find(filter.mongoQuery, fields)
        .skip((filter.page - 1) * filter.limit)
        .limit(filter.limit)
        .sort(filter.sort)
        .exec();
    } catch (err) {
      console.log(err);
    }
  }
}
