import { ERoles } from '@app/common/enums/roles';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsArray,
  IsEnum,
  IsNumber,
  IsStrongPassword,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'juan@gmail.com' })
  email: string;
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty({ type: 'string', example: '45353434' })
  password: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: '1993-01-01' })
  birth_date;
  @IsString()
  @IsEnum(ERoles)
  @ApiProperty({
    enum: [ERoles.Payer, ERoles.Collector],
    example: ERoles.Payer,
  })
  role: ERoles;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Juan' })
  first_name: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Lopez' })
  last_name: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Calle 123' })
  address: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: '+58' })
  calling_code: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: 'number', example: 1234567890 })
  phone: number;
}
