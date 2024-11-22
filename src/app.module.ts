import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { DatabaseModule } from './common/database/database.module';
import { modules } from './modules';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';
import { UsersCommand } from './common/seeders/users/users.command';
import { UsersService } from './modules/users/users.service';
import { UsersMongoRepository } from './modules/users/repository/users.mongo.repository';
import { UsersSeederService } from './common/seeders/users/users.seeder.service';
import { SeedersModule } from './common/seeders/command.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(configuration.databases.mongo.uri),
    CommandModule,
    SeedersModule,
    ...modules,
  ],
})
export class AppModule {}
