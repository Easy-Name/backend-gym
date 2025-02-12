import { Test, TestingModule } from '@nestjs/testing';
import { PlanCompositionController } from './plan-composition.controller';
import { PlanCompositionService } from './plan-composition.service';

describe('PlanCompositionController', () => {
  let controller: PlanCompositionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanCompositionController],
      providers: [PlanCompositionService],
    }).compile();

    controller = module.get<PlanCompositionController>(PlanCompositionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
