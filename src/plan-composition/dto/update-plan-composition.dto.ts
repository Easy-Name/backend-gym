import { PartialType } from '@nestjs/swagger';
import { CreatePlanCompositionDto } from './create-plan-composition.dto';

export class UpdatePlanCompositionDto extends PartialType(CreatePlanCompositionDto) {}
