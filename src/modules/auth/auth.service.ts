import { UsersService } from '@app/modules/users/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtAuthService: JwtService,
  ) {}

  async login(userObjectLogin: LoginAuthDto) {
    const platformName = 'owner';
    const { email, password } = userObjectLogin;
    const findAccount = await this.usersService.findOne({
      email: email.toLowerCase(),
    });
    const passwordHash = findAccount?.platforms?.find(
      (item) => item?.name === platformName,
    )?.platform_id;
    if (!passwordHash) {
      throw new HttpException(
        'USER_DOES_NOT_HAVE_ACCOUNT',
        HttpStatus.NOT_FOUND,
      );
    }
    const checkPassword = await compare(password, passwordHash);
    if (!checkPassword) {
      throw new HttpException('PASSWORD_INCORRECT', HttpStatus.FORBIDDEN);
    }
    const payload = {
      sub: findAccount._id,
      userId: findAccount._id,
      role: findAccount.role,
    };
    const token = await this.jwtAuthService.signAsync(payload);
    if (!!token) {
      return { message: 'User successfully authenticated', tokenAuth: token };
    } else {
      throw new HttpException(
        'USER_ERROR_AUTHENTICATION',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
