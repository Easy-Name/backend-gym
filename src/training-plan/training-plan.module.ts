import { Module } from '@nestjs/common';
import { TrainingPlanService } from './training-plan.service';
import { TrainingPlanController } from './training-plan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { TrainingPlan } from './entities/training-plan.entity';
import { PlanComposition } from 'src/plan-composition/entities/plan-composition.entity';

@Module({
  controllers: [TrainingPlanController],
  providers: [TrainingPlanService],
  imports: [TypeOrmModule.forFeature([User, TrainingPlan, PlanComposition])],
})
export class TrainingPlanModule {}
