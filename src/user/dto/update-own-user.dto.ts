import { PartialType } from '@nestjs/mapped-types';

import { CreateOwnUserDto } from './create-own-user.dto';

export class UpdateOwnUserDto extends PartialType(CreateOwnUserDto) {}
