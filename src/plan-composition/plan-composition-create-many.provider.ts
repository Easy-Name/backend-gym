import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { PlanComposition } from './entities/plan-composition.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateManyPlanCompositionDto } from './dto/create-many-plan-composition.dto';

@Injectable()
export class PlanCompositionCreateManyProvider {
  constructor(
    @InjectRepository(PlanComposition)
    private readonly exerciseRepository: Repository<PlanComposition>,

    //inject DataSource
    private readonly dataSource: DataSource,
  ) {}
  public async createMany(
    createManyPlanCompositionDto: CreateManyPlanCompositionDto,
  ): Promise<PlanComposition[]> {
    const newPlanCompositions: PlanComposition[] = [];

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
      for (const planComposition of createManyPlanCompositionDto.planComposition) {
        const newPlanComposition = queryRunner.manager.create(
          PlanComposition,
          planComposition,
        );
        const result = await queryRunner.manager.save(newPlanComposition);
        newPlanCompositions.push(result);
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

    return newPlanCompositions;
  }
}
