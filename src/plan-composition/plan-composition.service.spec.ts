import { Test, TestingModule } from '@nestjs/testing';
import { PlanCompositionService } from './plan-composition.service';

describe('PlanCompositionService', () => {
  let service: PlanCompositionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanCompositionService],
    }).compile();

    service = module.get<PlanCompositionService>(PlanCompositionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
