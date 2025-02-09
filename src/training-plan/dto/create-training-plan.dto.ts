import { IsDateString, IsEnum, IsInt, IsNotEmpty, Min } from 'class-validator';
import { TrainingPlanStatus } from '../entities/training-plan-status.enum';


export class CreateTrainingPlanDto {
  @IsDateString() // Ensures the value is a valid date string (e.g., '2023-10-01')
  @IsNotEmpty() // Ensures the field is not empty
  startDate: Date;

  @IsDateString() // Ensures the value is a valid date string
  @IsNotEmpty() // Ensures the field is not empty
  endDate: Date;

  @IsEnum(TrainingPlanStatus) // Ensures the value is one of the enum values
  @IsNotEmpty() // Ensures the field is not empty
  status: TrainingPlanStatus;

  @IsInt() // Ensures the value is an integer
  @Min(1) // Ensures the value is at least 1
  @IsNotEmpty() // Ensures the field is not empty
  days: number;

  @IsInt() // Ensures the value is an integer
  @IsNotEmpty() // Ensures the field is not empty
  userId: number; // Foreign key to the User entity
}
