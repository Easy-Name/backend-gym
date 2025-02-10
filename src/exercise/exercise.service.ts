import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from './entities/exercise.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
  ) {}

  async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    const exerciseNameTrim = createExerciseDto.exerciseName
      .trim()
      .toLowerCase();
    const exerciseBodyPartTrim = createExerciseDto.targetBodyPart
      .trim()
      .toLowerCase();

    const existingExercise = await this.exerciseRepository.findOne({
      where: { exerciseName: exerciseNameTrim },
    });
    if (existingExercise) {
      throw new ConflictException('An exercise with this name already exists.');
    }

    try {
      const exercise = this.exerciseRepository.create({
        ...createExerciseDto,
        exerciseName: exerciseNameTrim,
        targetBodyPart: exerciseBodyPartTrim,
      });

      return await this.exerciseRepository.save(exercise);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create professor.');
    }
  }

  async findAll(): Promise<Exercise[]> {
    try {
      return await this.exerciseRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch exercises.');
    }
  }

  async findOne(id: number): Promise<Exercise> {
    if (!id || id <= 0) {
      throw new BadRequestException('Invalid ID provided');
    }
    const exercise = await this.exerciseRepository.findOne({
      where: { id },
    });
    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${id} not found.`);
    }
    return exercise;
  }

  async update(
    id: number,
    updateExerciseDto: UpdateExerciseDto,
  ): Promise<Exercise> {
    const exercise = await this.findOne(id);

    if (!exercise) {
      throw new NotFoundException('The exercise does not exist.');
    }

    if (updateExerciseDto.exerciseName) {
      updateExerciseDto.exerciseName =
        updateExerciseDto.exerciseName.toLowerCase();
    }
    if (updateExerciseDto.targetBodyPart) {
      updateExerciseDto.targetBodyPart =
        updateExerciseDto.targetBodyPart.toLowerCase();
    }

    // Merge the updated data into the existing professor entity
    const updatedExercise = this.exerciseRepository.merge(
      exercise,
      updateExerciseDto,
    );

    try {
      return await this.exerciseRepository.save(updatedExercise);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update exercise.');
    }
  }

  async remove(id: number): Promise<void> {
    const exercise = await this.findOne(id); // Check if the exercise exists

    if (!id || id <= 0) {
      throw new BadRequestException('Invalid ID provided');
    }

    if (!exercise) {
      throw new NotFoundException('The exercise does not exist.');
    }

    try {
      await this.exerciseRepository.remove(exercise);
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete professor.');
    }
  }
}
