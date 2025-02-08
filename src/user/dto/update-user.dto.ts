import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  /*@ApiProperty({
    description: 'id of the post that has to be updated',
  })
  @IsInt()
  @IsNotEmpty()
  id: number;*/
}
