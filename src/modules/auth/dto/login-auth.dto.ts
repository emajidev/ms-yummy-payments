import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({ example: 'luisjose@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty({ example: 'PassW0rd!3x4m913' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(14)
  password: string;
}
