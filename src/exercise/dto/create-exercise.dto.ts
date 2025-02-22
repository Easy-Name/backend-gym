import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  Length,
  IsUrl,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateExerciseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 96)
  exerciseName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 96)
  targetBodyPart: string;

  @ApiProperty()
  @IsUrl()
  @IsOptional()
  exerciseVideoLink?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  officialExercise?: boolean;
}
