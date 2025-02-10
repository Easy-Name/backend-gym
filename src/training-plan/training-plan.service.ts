import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrainingPlanDto } from './dto/create-training-plan.dto';
import { UpdateTrainingPlanDto } from './dto/update-training-plan.dto';
import { TrainingPlan } from './entities/training-plan.entity';

@Injectable()
export class TrainingPlanService {
  constructor(
    @InjectRepository(TrainingPlan)
    private readonly trainingPlanRepository: Repository<TrainingPlan>,
  ) {}

  // Create a new training plan
  async create(
    createTrainingPlanDto: CreateTrainingPlanDto,
  ): Promise<TrainingPlan> {
    const trainingPlan = this.trainingPlanRepository.create(
      createTrainingPlanDto,
    );
    return await this.trainingPlanRepository.save(trainingPlan);
  }

  // Retrieve all training plans
  async findAll(): Promise<TrainingPlan[]> {
    try {
      return await this.trainingPlanRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch training plan.');
    }
  }

  // Retrieve a single training plan by ID
  async findOne(id: number): Promise<TrainingPlan> {
    if (!id || id <= 0) {
      throw new BadRequestException('Invalid ID provided');
    }
    const trainingPlan = await this.trainingPlanRepository.findOne({
      where: { id },
    });
    if (!trainingPlan) {
      throw new NotFoundException(`TrainingPlan with ID ${id} not found`);
    }
    return trainingPlan;
  }

  // Update a training plan by ID
  async update(
    id: number,
    updateTrainingPlanDto: UpdateTrainingPlanDto,
  ): Promise<TrainingPlan> {
    if (!id || id <= 0) {
      throw new BadRequestException('Invalid ID provided');
    }
    const trainingPlan = await this.trainingPlanRepository.findOne({
      where: { id },
    });
    if (!trainingPlan) {
      throw new NotFoundException(`TrainingPlan with ID ${id} not found`);
    }

    try {
      this.trainingPlanRepository.merge(trainingPlan, updateTrainingPlanDto); // Merge the changes
      return await this.trainingPlanRepository.save(trainingPlan); // Save the updated plan
    } catch (error) {
      throw new InternalServerErrorException('Failed to update training plan.');
    }
  }

  // Delete a training plan by ID
  async remove(id: number): Promise<void> {
    if (!id || id <= 0) {
      throw new BadRequestException('Invalid ID provided');
    }
    const trainingPlan = await this.trainingPlanRepository.findOne({
      where: { id },
    });
    if (!trainingPlan) {
      throw new NotFoundException(`TrainingPlan with ID ${id} not found`);
    }

    try {
      await this.trainingPlanRepository.remove(trainingPlan);
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete training plan.');
    }
  }
}
