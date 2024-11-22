import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsSchema } from './schemas/transactions.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpService } from '../otp/otp.service';
import { TransactionsService } from './transactions.service';
import { TransactionsMongoRepository } from './repository/transactions.mongo.repository';
import { OtpMongoRepository } from '../otp/repository/otp-mongo.repository';
import { OtpSchema } from '../otp/schemas/otp.schema';
import { UsersService } from '../users/users.service';
import { UsersMongoRepository } from '../users/repository/users.mongo.repository';
import { UserSchema } from '../users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'transactions', schema: TransactionsSchema },
      { name: 'otps', schema: OtpSchema },
      { name: 'users', schema: UserSchema },
    ]),
  ],
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    TransactionsMongoRepository,
    OtpService,
    OtpMongoRepository,
    UsersMongoRepository,
  ],
})
export class TransactionsModule {}
