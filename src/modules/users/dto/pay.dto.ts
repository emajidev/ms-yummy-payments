import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateBalanceDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: 'number' })
  balance: number;
}
