import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTransactionsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string' })
  description: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: 'number' })
  amount: number;
}
