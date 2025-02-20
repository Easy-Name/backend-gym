import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTrainingPlanDto } from './create-training-plan.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { TrainingPlanStatus } from '../entities/training-plan-status.enum';

export class UpdateTrainingPlanDto extends PartialType(CreateTrainingPlanDto) {
  @ApiProperty()
  @IsEnum(TrainingPlanStatus) // Ensures the value is one of the enum values
  @IsNotEmpty() // Ensures the field is not empty
  status: TrainingPlanStatus;
}
