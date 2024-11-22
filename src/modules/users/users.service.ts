import { hash } from 'bcrypt';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersMongoRepository } from './repository/users.mongo.repository';
import { userNotFound } from './users.errors';

import { Types } from 'mongoose';
import { ERoles } from '@app/common/enums/roles';
import { UpdateBalanceDto } from './dto/pay.dto';
import configuration from '@app/config/configuration';
import { DateTime } from 'luxon';

@Injectable()
export class UsersService {
  constructor(
    @Inject(REQUEST) private request: Request,
    private usersModel: UsersMongoRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { email, phone, calling_code, password, birth_date } =
        createUserDto;
      const emailExist = await this.usersModel.findOne({ email });
      if (emailExist) {
        throw new HttpException('Email in use', 406);
      }
      const phoneExist = await this.usersModel.findOne({ phone, calling_code });
      if (phoneExist) {
        throw new HttpException('Phone number in use', 406);
      }
      const age = DateTime.now().diff(birth_date, 'years').years;
      if (age < 18) {
        throw new HttpException('User must be at least 18 years old', 406);
      }
      const plaintoHash = await hash(password, 10);

      const platforms = [
        {
          name: 'owner',
          platform_id: plaintoHash,
        },
      ];
      createUserDto['platforms'] = platforms;

      let balance = 100;
      if (createUserDto.role === ERoles.Payer) {
        balance = 1000;
      }
      const userCreated = await this.usersModel.create({
        ...createUserDto,
        balance,
      });
      if (userCreated) {
        //
      }
    } catch (error) {
      throw new HttpException(error, 500);
    }
    return { message: `User ${createUserDto?.email} created` };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const query = { _id: id };
      return await this.usersModel.findOneAndUpdate(query, updateUserDto);
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async findAll() {
    return await this.usersModel.findAll();
  }

  async findOne(filter) {
    return await this.usersModel.findOne(filter);
  }

  async findUser(email: string) {
    const userData = await this.usersModel.findOne({ email });
    if (!!!userData) {
      throw new userNotFound(email);
    }
    return userData;
  }

  async findByIdAndUpdate(id: string, updateUserDto: UpdateUserDto) {
    return await this.usersModel.findByIdAndUpdate(
      new Types.ObjectId(id),
      updateUserDto,
    );
  }

  async updateBalance(id: string, updateBalance: UpdateBalanceDto) {
    try {
      return await this.usersModel.findByIdAndUpdate(new Types.ObjectId(id), {
        balance: updateBalance.balance,
      });
      // const payerId = this.request.headers.userId as string;
      // const findPayer = await this.usersModel.findById(
      //   new mongo.ObjectId(payerId),
      // );

      // await this.usersModel.findByIdAndUpdate(
      //   new Types.ObjectId(id),
      //   payToCollectorDto,
      // );
      // if (payToCollectorDto.balance > findPayer?.balance) {
      //   throw new HttpException(
      //     'the amount payable is greater than the balance ',
      //     403,
      //   );
      // }
      // const newBalance = findPayer?.balance - payToCollectorDto.balance;

      // await this.usersModel.findByIdAndUpdate(new Types.ObjectId(id), {
      //   balance: newBalance < 0 ? 0 : newBalance,
      // });
      // return {
      //   message: `You paid ${payToCollectorDto.balance} to collector with Id ${id}`,
      // };
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async remove(id: string) {
    const userData = await this.usersModel.findOneAndUpdate(
      { _id: id },
      { deleted_at: new Date().toISOString() },
    );
    if (!!!userData) {
      throw new userNotFound(id);
    }
    return userData;
  }
}
