import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUser extends PartialType(CreateUserDto) {}

export class UpdateUserDto extends UpdateUser {}
