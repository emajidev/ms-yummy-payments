import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { RequestInterceptor } from '@app/common/interceptor/request.interceptor';
import { UpdateBalanceDto } from './dto/pay.dto';
import { Auth } from '@app/common/decorators/auth.decorator';


@ApiTags('Users')
@Auth()
@UseInterceptors(RequestInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.usersService.findUser(email);
  }

  @Patch('balance/:id')
  update(@Param('id') id: string, @Body() updateBalance: UpdateBalanceDto) {
    return this.usersService.updateBalance(id, updateBalance);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
