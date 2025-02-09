import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from './entities/exercise.entity';

@Module({
  controllers: [ExerciseController],
  providers: [ExerciseService],
  imports: [TypeOrmModule.forFeature([Exercise])],
})
export class ExerciseModule {}
