import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UsersSeederService } from './users.seeder.service';
@Injectable()
export class UsersCommand {
  constructor(private readonly usersService: UsersSeederService) {}

  @Command({
    command: 'seed:users',
    describe: 'Create users',
  })
  async create() {
    console.log('Start seed users');
    const data: any = await this.usersService.findAll();
    if (data.length == 0) {
      await this.import();
    }
    process.exit(1);
  }

  async import() {
    console.log('Start import users');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const items = require('./users.json');
    for (const item of items) {
      const result: any = await this.usersService.create({
        ...item,
        balance: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      console.log('insert record', result);
    }
    console.log('Finish import users');
  }
}
