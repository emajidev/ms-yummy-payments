import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { HttpException, Inject, Injectable } from '@nestjs/common';
import { TransactionsMongoRepository } from './repository/transactions.mongo.repository';
import { CreateTransactionsDto } from './dto/create-transactions.dto';
import { mongo } from 'mongoose';
import { OtpService } from '../otp/otp.service';
import { UsersMongoRepository } from '../users/repository/users.mongo.repository';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject(REQUEST) private request: Request,
    private transactionsModel: TransactionsMongoRepository,
    private otpService: OtpService,
    private usersMongoRepository: UsersMongoRepository,
  ) {}

  async create(collectorId: string, createUserDto: CreateTransactionsDto) {
    await this.validationCollector(collectorId);

    const createUserDtoWithObjectId = {
      _id: new mongo.ObjectId(),
      ...createUserDto,
      payer: new mongo.ObjectId(this.request.headers.userId as string),
      collector: new mongo.ObjectId(collectorId),
    };
    const newTransaction = await this.transactionsModel.create(
      createUserDtoWithObjectId,
    );
    const otp = await this.otpService.generateOtp(
      newTransaction._id.toHexString(),
      collectorId,
    );
    return {
      message: 'Transaction created successfully',
      description: 'Please send the OTP to Collector to authorize the payment',
      otp,
    };
  }

  private async validationCollector(collectorId: string) {
    const findCollector = await this.usersMongoRepository.findById(
      new mongo.ObjectId(collectorId),
    );
    if (!findCollector) {
      throw new HttpException('Collector not found', 404);
    }
    if (findCollector.role !== 'collector') {
      throw new HttpException(
        `The user ${collectorId}  is not a collector`,
        404,
      );
    }
  }

  async findById(id: string) {
    return await this.transactionsModel.findOne({
      _id: new mongo.ObjectId(id),
    });
  }

  async findAllByUser() {
    const userId = this.request.headers.userId as string;
    return await this.transactionsModel.find({
      $or: [
        { payer: new mongo.ObjectId(userId) },
        { collector: new mongo.ObjectId(userId) },
      ],
    });
  }

  async authorizePayment(id: string, otp: string) {
    try {
      await this.validateOtp(id, otp);
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  //Private methods
  private async validateOtp(id, otp: string) {
    const userId = this.request.headers.userId as string;
    const user = await this.otpService.verifyOtp(userId, otp, id);
    if (!user) {
      throw new HttpException('Invalid OTP', 400);
    }
  }
}
