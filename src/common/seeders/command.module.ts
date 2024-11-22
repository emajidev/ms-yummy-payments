import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '@app/modules/users/schemas/user.schema';
import { UsersCommand } from './users/users.command';
import { UsersSeederService } from './users/users.seeder.service';
import { UsersMongoRepository } from '@app/modules/users/repository/users.mongo.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'users',
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UsersCommand, UsersSeederService, UsersMongoRepository],
  exports: [UsersSeederService],
})
export class SeedersModule {}
