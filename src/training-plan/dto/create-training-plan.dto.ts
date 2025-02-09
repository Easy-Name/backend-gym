import { IsDateString, IsEnum, IsInt, IsNotEmpty, Min } from 'class-validator';
import { TrainingPlanStatus } from '../entities/training-plan-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrainingPlanDto {
  @ApiProperty()
  @IsDateString() // Ensures the value is a valid date string (e.g., '2023-10-01')
  @IsNotEmpty() // Ensures the field is not empty
  startDate: Date;

  @ApiProperty()
  @IsDateString() // Ensures the value is a valid date string
  @IsNotEmpty() // Ensures the field is not empty
  endDate: Date;

  @ApiProperty()
  @IsEnum(TrainingPlanStatus) // Ensures the value is one of the enum values
  @IsNotEmpty() // Ensures the field is not empty
  status: TrainingPlanStatus;

  @ApiProperty()
  @IsInt() // Ensures the value is an integer
  @Min(1) // Ensures the value is at least 1
  @IsNotEmpty() // Ensures the field is not empty
  days: number;

  @ApiProperty()
  @IsInt() // Ensures the value is an integer
  @IsNotEmpty() // Ensures the field is not empty
  userId: number; // Foreign key to the User entity
}
