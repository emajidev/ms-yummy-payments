import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class recoveryNotification {
  @ApiProperty({ example: 'luisjose@gmail.com' })
  @IsString()
  email: string;
}
