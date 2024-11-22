import { UsersMongoRepository } from '@app/modules/users/repository/users.mongo.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersSeederService {
  constructor(private readonly mongoRepository: UsersMongoRepository) {}
  async findAll(): Promise<any> {
    return await this.mongoRepository.findAll();
  }

  async create(body): Promise<any> {
    return await this.mongoRepository.create(body);
  }
}
