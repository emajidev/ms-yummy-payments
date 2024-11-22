import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpService } from './otp.service';
import { OtpSchema } from './schemas/otp.schema';
import { OtpMongoRepository } from './repository/otp-mongo.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'otps', schema: OtpSchema }])],
  controllers: [OtpService, OtpMongoRepository],
  exports: [OtpService, OtpMongoRepository],
})
export class OtpModuleModule {}
