import { ERoles } from '@app/common/enums/roles';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterAuthDto {
  @IsArray()
  @ApiProperty({ enum: Object.values(ERoles), example: [ERoles.Payer] })
  roles: Array<ERoles>;
  @ApiProperty({ example: 'luis' })
  @IsString()
  @IsNotEmpty()
  first_name: string;
  @ApiProperty({ example: 'jose' })
  @IsString()
  @IsNotEmpty()
  last_name: string;
  @ApiProperty({ example: 'luisjose@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty({ example: 'PassW0rd' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(14)
  password: string;
  @ApiProperty({ type: 'array' })
  permissions: string[];
}
