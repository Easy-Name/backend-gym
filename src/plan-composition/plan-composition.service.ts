import { Injectable } from '@nestjs/common';
import { CreatePlanCompositionDto } from './dto/create-plan-composition.dto';
import { UpdatePlanCompositionDto } from './dto/update-plan-composition.dto';

@Injectable()
export class PlanCompositionService {
  create(createPlanCompositionDto: CreatePlanCompositionDto) {
    return 'This action adds a new planComposition';
  }

  findAll() {
    return `This action returns all planComposition`;
  }

  findOne(id: number) {
    return `This action returns a #${id} planComposition`;
  }

  update(id: number, updatePlanCompositionDto: UpdatePlanCompositionDto) {
    return `This action updates a #${id} planComposition`;
  }

  remove(id: number) {
    return `This action removes a #${id} planComposition`;
  }
}
