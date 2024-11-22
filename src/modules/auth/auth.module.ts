import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from 'src/config/configuration';
import { UserSchema } from '@app/modules/users/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@app/common/strategies/jwt.strategy';
import { UsersMongoRepository } from '@app/modules/users/repository/users.mongo.repository';
import { UsersService } from '@app/modules/users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),

    JwtModule.register({
      secret: configuration.jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsersMongoRepository, UsersService],
})
export class AuthModule {}
