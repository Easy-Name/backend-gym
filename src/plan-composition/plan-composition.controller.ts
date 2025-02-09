import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlanCompositionService } from './plan-composition.service';
import { CreatePlanCompositionDto } from './dto/create-plan-composition.dto';
import { UpdatePlanCompositionDto } from './dto/update-plan-composition.dto';

@Controller('plan-composition')
export class PlanCompositionController {
  constructor(private readonly planCompositionService: PlanCompositionService) {}

  @Post()
  create(@Body() createPlanCompositionDto: CreatePlanCompositionDto) {
    return this.planCompositionService.create(createPlanCompositionDto);
  }

  @Get()
  findAll() {
    return this.planCompositionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planCompositionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanCompositionDto: UpdatePlanCompositionDto) {
    return this.planCompositionService.update(+id, updatePlanCompositionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planCompositionService.remove(+id);
  }
}
