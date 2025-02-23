import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PlanCompositionService } from './plan-composition.service';
import { CreatePlanCompositionDto } from './dto/create-plan-composition.dto';
import { UpdatePlanCompositionDto } from './dto/update-plan-composition.dto';
import { CreateManyPlanCompositionDto } from './dto/create-many-plan-composition.dto';
import { Professor } from 'src/auth/decorators/professor.decorator';

@Controller('plan-composition')
export class PlanCompositionController {
  constructor(
    private readonly planCompositionService: PlanCompositionService,
  ) {}

  @Post()
  create(@Body() createPlanCompositionDto: CreatePlanCompositionDto) {
    return this.planCompositionService.create(createPlanCompositionDto);
  }

  @Post('create-many')
  async createMany(
    @Body() createManyPlanCompositionDto: CreateManyPlanCompositionDto,
  ) {
    await this.planCompositionService.createMany(createManyPlanCompositionDto);
  }

  @Get()
  findAll() {
    return this.planCompositionService.findAll();
  }

  @Get('user/:userId') // Define the route with `id` as a path parameter
  async findAllByUser(
    @Param('id') id: string, // Extract `id` from the path
    @Query('status') status: string = 'ACTIVE', // Extract `status` from the query string, default to 'ACTIVE'
  ) {
    return this.planCompositionService.findAllByUser(+id, status); // Call the service method
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planCompositionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlanCompositionDto: UpdatePlanCompositionDto,
  ) {
    return this.planCompositionService.update(+id, updatePlanCompositionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planCompositionService.remove(+id);
  }
}
