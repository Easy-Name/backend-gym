import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Public()
  @Post()
  create(@Body() createProfessorDto: CreateProfessorDto) {
    return this.professorService.create(createProfessorDto);
  }

  @Get()
  findAll() {
    return this.professorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professorService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProfessorDto: UpdateProfessorDto,
  ) {
    return this.professorService.update(+id, updateProfessorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professorService.remove(+id);
  }
/*
  @Get('me')
  findMyself(@Request() req) {
    const professorId = req.user.id; // Extract professor ID from JWT
    return this.professorService.findOne(professorId);
  }

  @Patch('me')
  updateMyself(@Request() req, @Body() updateProfessorDto: UpdateProfessorDto) {
    const professorId = req.user.id; // Extract professor ID from JWT
    return this.professorService.update(professorId, updateProfessorDto);
  }

  @Delete('me')
  removeMyself(@Request() req) {
    //const professorId = req.user.id; // Extract professor ID from JWT
    console.log('vvvvvvvvvvvvvvvvvvvvvvvv');
    return this.professorService.remove(7);
  }*/
}
