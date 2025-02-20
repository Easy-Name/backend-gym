import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateOwnUserDto } from './dto/create-own-user.dto';
import { Professor } from 'src/auth/decorators/professor.decorator';
import { RolesGuard } from 'src/auth/guards/access-token/role.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  //@UseGuards(RolesGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('me')
  createOwn(
    @Body() createOwnUserDto: CreateOwnUserDto,
    @Professor() sub: number,
  ) {
    return this.usersService.createOwn(createOwnUserDto, sub);
  }

  @Get()
  //@UseGuards(RolesGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  findAllOwn(@Professor() sub: number) {
    return this.usersService.findAllOwn(sub);
  }

  @Get(':id')
  //@UseGuards(RolesGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get('me/:id')
  findOneOwn(@Param('id') id: string, @Professor() sub: number) {
    return this.usersService.findOneOwn(+id, sub);
  }

  @Patch(':id')
  //@UseGuards(RolesGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Patch('me/:id')
  updateOwn(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Professor() sub: number,
  ) {
    return this.usersService.updateOwn(+id, updateUserDto, sub);
  }

  @Delete(':id')
  //@UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Delete('me/:id')
  removeOwn(@Param('id') id: string, @Professor() sub: number) {
    return this.usersService.removeOwn(+id, sub);
  }
}
