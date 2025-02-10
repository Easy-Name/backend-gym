import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { Exercise } from '../exercise/entities/exercise.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateManyExercisesDto } from './dto/create-many-exercises.dto';

@Injectable()
export class ExercisesCreateManyProvider {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,

    //inject DataSource
    private readonly dataSource: DataSource,
  ) {}
  public async createMany(
    createManyExercisesDto: CreateManyExercisesDto,
  ): Promise<Exercise[]> {
    const newExercises: Exercise[] = [];

    //Create Query RUnner Instance
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      //Connect Query Runner to datasource
      await queryRunner.connect();

      //Start Transaction
      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException('Could not connect to database');
    }

    try {
      //If successful commit
      for (const exercise of createManyExercisesDto.exercises) {
        const newExercise = queryRunner.manager.create(Exercise, exercise);
        const result = await queryRunner.manager.save(newExercise);
        newExercises.push(result);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      //If unsuccessful rollback
      await queryRunner.rollbackTransaction();
      throw new ConflictException('Could not complete the transaction', {
        description: String(error),
      });
    } finally {
      try {
        //Release connection
        await queryRunner.release();
      } catch (error) {
        throw (
          (new ConflictException('Could not connect to the database'),
          {
            description: String(error),
          })
        );
      }
    }

    return newExercises;
  }
}
