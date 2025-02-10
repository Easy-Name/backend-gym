import {
  IsInt,
  IsPositive,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreatePlanCompositionDto {
  @IsInt()
  @IsPositive()
  trainingPlanId: number;

  @IsInt()
  @IsPositive()
  exerciseId: number;

  @IsInt()
  @IsPositive()
  numberOfSets: number;

  @IsInt()
  @IsPositive()
  numberOfRepetitions: number;

  @IsOptional()
  @IsString()
  observations?: string;

  @IsString()
  @Length(1, 1) // Ensures it's a single character (e.g., 'A', 'B', 'C')
  day: string;
}
