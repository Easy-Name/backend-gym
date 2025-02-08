import { PartialType } from '@nestjs/mapped-types';
import { CreateProfessorDto } from './create-professor.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateProfessorDto extends PartialType(CreateProfessorDto) {
  /*@ApiProperty({
    description: 'id of the post that has to be updated',
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
*/
}
