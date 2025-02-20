import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanComposition } from './entities/plan-composition.entity';
import { CreatePlanCompositionDto } from './dto/create-plan-composition.dto';
import { UpdatePlanCompositionDto } from './dto/update-plan-composition.dto';
import { PlanCompositionCreateManyProvider } from './plan-composition-create-many.provider';
import { CreateManyPlanCompositionDto } from './dto/create-many-plan-composition.dto';

@Injectable()
export class PlanCompositionService {
  constructor(
    @InjectRepository(PlanComposition)
    private readonly planCompositionRepository: Repository<PlanComposition>,
    private readonly planCompositionCreateManyProvider: PlanCompositionCreateManyProvider,
  ) {}

  async create(
    createPlanCompositionDto: CreatePlanCompositionDto,
  ): Promise<PlanComposition> {
    try {
      const newPlanComposition = this.planCompositionRepository.create(
        createPlanCompositionDto,
      );
      return await this.planCompositionRepository.save(newPlanComposition);
    } catch (error) {
      throw new InternalServerErrorException('Error creating PlanComposition');
    }
  }

  async findAll(): Promise<PlanComposition[]> {
    try {
      return await this.planCompositionRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        'Error retrieving PlanComposition records',
      );
    }
  }

  async findOne(id: number): Promise<PlanComposition> {
    if (!id || id <= 0) {
      throw new BadRequestException('Invalid ID provided');
    }

    try {
      const planComposition = await this.planCompositionRepository.findOne({
        where: { id },
      });
      if (!planComposition) {
        throw new NotFoundException(`PlanComposition with ID ${id} not found`);
      }
      return planComposition;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error retrieving PlanComposition with ID ${id}`,
      );
    }
  }

  async update(
    id: number,
    updatePlanCompositionDto: UpdatePlanCompositionDto,
  ): Promise<PlanComposition> {
    if (!id || id <= 0) {
      throw new BadRequestException('Invalid ID provided');
    }

    try {
      const planComposition = await this.findOne(id);
      Object.assign(planComposition, updatePlanCompositionDto);
      return await this.planCompositionRepository.save(planComposition);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error updating PlanComposition with ID ${id}`,
      );
    }
  }

  async remove(id: number): Promise<void> {
    if (!id || id <= 0) {
      throw new BadRequestException('Invalid ID provided');
    }

    try {
      const result = await this.planCompositionRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`PlanComposition with ID ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException(
        `Error deleting PlanComposition with ID ${id}`,
      );
    }
  }

  async createMany(createManyPlanCompositionDto: CreateManyPlanCompositionDto) {
    await this.planCompositionCreateManyProvider.createMany(
      createManyPlanCompositionDto,
    );
  }
}
