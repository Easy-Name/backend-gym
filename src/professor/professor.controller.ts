import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { RolesGuard } from 'src/auth/guards/access-token/role.guard';
import { Professor } from 'src/auth/decorators/professor.decorator';

@Controller('professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Public()
  @Post()
  create(@Body() createProfessorDto: CreateProfessorDto) {
    return this.professorService.create(createProfessorDto);
  }

  @Get()
  @UseGuards(RolesGuard)
  findAll() {
    return this.professorService.findAll();
  }

  @Get('/adm/:id')
  @UseGuards(RolesGuard)
  findOneAdmin(@Param('id') id: string) {
    return this.professorService.findOne(+id);
  }

  @Get('me')
  findOne(@Professor() sub: number) {
    const id = sub;
    return this.professorService.findOne(id);
  }

  @Patch('adm/:id')
  @UseGuards(RolesGuard)
  updateAdmin(
    @Param('id') id: string,
    @Body() updateProfessorDto: UpdateProfessorDto,
  ) {
    return this.professorService.update(+id, updateProfessorDto);
  }

  @Patch('me')
  update(
    @Professor() sub: number,
    @Body() updateProfessorDto: UpdateProfessorDto,
  ) {
    const id = sub;
    return this.professorService.update(+id, updateProfessorDto);
  }

  @Delete('admin/:id')
  @UseGuards(RolesGuard)
  removeAdmin(@Param('id') id: string) {
    return this.professorService.remove(+id);
  }

  @Delete('me')
  remove(@Professor() sub: number) {
    const id = sub;
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
