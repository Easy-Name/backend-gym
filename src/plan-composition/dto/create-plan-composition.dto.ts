import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsPositive,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreatePlanCompositionDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  trainingPlanId: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  exerciseId: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  numberOfSets: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  numberOfRepetitions: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  observations?: string;

  @ApiProperty()
  @IsString()
  @Length(1, 1) // Ensures it's a single character (e.g., 'A', 'B', 'C')
  day: string;
}
