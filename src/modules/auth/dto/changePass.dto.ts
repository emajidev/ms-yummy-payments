import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class changePassDto {
  @ApiProperty({ example: '!3x4m913' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(14)
  password: string;
}
