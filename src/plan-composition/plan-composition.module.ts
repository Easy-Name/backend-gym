import { Module } from '@nestjs/common';
import { PlanCompositionService } from './plan-composition.service';
import { PlanCompositionController } from './plan-composition.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingPlan } from 'src/training-plan/entities/training-plan.entity';
import { Exercise } from 'src/exercise/entities/exercise.entity';
import { PlanComposition } from './entities/plan-composition.entity';

@Module({
  controllers: [PlanCompositionController],
  providers: [PlanCompositionService],
  imports: [
    TypeOrmModule.forFeature([TrainingPlan, Exercise, PlanComposition]),
  ],
})
export class PlanCompositionModule {}
