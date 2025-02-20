import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreatePlanCompositionDto } from './create-plan-composition.dto';

export class CreateManyPlanCompositionDto {
  @ApiProperty({
    type: 'array',
    required: true,
    items: {
      type: 'PlanCompositon',
    },
  })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreatePlanCompositionDto)
  planComposition: CreatePlanCompositionDto[];
}
