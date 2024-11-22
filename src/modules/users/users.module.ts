import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { UsersMongoRepository } from './repository/users.mongo.repository';
import { FilterPaginateMiddleware } from '@app/common/middleware/req-filterpaginate.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'users', schema: UserSchema},
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersMongoRepository],
  exports: [UsersService, UsersMongoRepository],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FilterPaginateMiddleware).forRoutes('/');
  }
}
