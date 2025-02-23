import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsPositive,
  IsOptional,
  IsString,
  Length,
  IsDateString,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { PlanCompositionStatus } from '../entities/plan-composition-status.enum';

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

  @ApiProperty()
  @IsInt()
  @IsPositive()
  userId: number;

  @ApiProperty()
  @IsDateString() // Ensures the value is a valid date string (e.g., '2023-10-01')
  @IsOptional()
  startDate?: Date;

  @ApiProperty()
  @IsDateString() // Ensures the value is a valid date string
  @IsOptional()
  endDate?: Date;

  @ApiProperty()
  @IsEnum(PlanCompositionStatus) // Ensures the value is one of the enum values
  @IsNotEmpty() // Ensures the field is not empty
  status: PlanCompositionStatus;
}
