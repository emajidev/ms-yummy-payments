import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UsePipes(
    new ValidationPipe({
      transform: true,
      skipMissingProperties: true,
      whitelist: true,
    }),
  )
  @Post('login')
  async login(@Body() userAuthDto: LoginAuthDto, @Res() response) {
    try {
      const res = await this.authService.login(userAuthDto);
      if (res) {
        return response.status(HttpStatus.OK).send(res);
      }
    } catch (error) {
      console.log('ERROR LOGIN CONTROLER', error);
      throw error;
    }
  }

  @Post('sing-up')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
