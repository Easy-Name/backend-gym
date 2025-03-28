import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from './entities/exercise.entity';
import { PlanComposition } from 'src/plan-composition/entities/plan-composition.entity';
import { ExercisesCreateManyProvider } from './exercise-create-many.provider';

@Module({
  controllers: [ExerciseController],
  providers: [ExerciseService, ExercisesCreateManyProvider],
  imports: [TypeOrmModule.forFeature([Exercise, PlanComposition])],
})
export class ExerciseModule {}
