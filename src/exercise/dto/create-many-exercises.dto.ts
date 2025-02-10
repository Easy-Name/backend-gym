import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateExerciseDto } from './create-exercise.dto';

export class CreateManyExercisesDto {
  @ApiProperty({
    type: 'array',
    required: true,
    items: {
      type: 'Exercise',
    },
  })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateExerciseDto)
  exercises: CreateExerciseDto[];
}
