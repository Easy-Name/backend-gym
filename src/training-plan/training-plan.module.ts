import { Module } from '@nestjs/common';
import { TrainingPlanService } from './training-plan.service';
import { TrainingPlanController } from './training-plan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { TrainingPlan } from './entities/training-plan.entity';

@Module({
  controllers: [TrainingPlanController],
  providers: [TrainingPlanService],
  imports: [TypeOrmModule.forFeature([User, TrainingPlan])],
})
export class TrainingPlanModule {}
