import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { OtpMongoRepository } from './repository/otp-mongo.repository';
import { mongo } from 'mongoose';

@Injectable()
export class OtpService {
  constructor(readonly otpMongoRepository: OtpMongoRepository) {}

  async generateOtp(
    transactionId: string,
    userId: string,
    length = 6,
  ): Promise<string> {
    const otp = crypto.randomBytes(length).toString('hex').slice(0, length);
    const createdOtp = await this.otpMongoRepository.create({
      code: otp,
      transaction_id: new mongo.ObjectId(transactionId),
      user_id: new mongo.ObjectId(userId),
    });
    return createdOtp.code;
  }

  async verifyOtp(
    userId: string,
    code: string,
    transactionId: string,
  ): Promise<boolean> {
    //Verify OTP
    const otpDocument = await this.otpMongoRepository.findOne({
      transaction_id: transactionId,
      user_id: userId,
      code,
    });
    if (!otpDocument) {
      return false;
    }
    return true;
  }
}
