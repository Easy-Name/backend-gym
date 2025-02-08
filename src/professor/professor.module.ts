import { Module } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { ProfessorController } from './professor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Professor } from './entities/professor.entity';

@Module({
  controllers: [ProfessorController],
  providers: [ProfessorService],
  imports: [TypeOrmModule.forFeature([Professor])], // Add User and Professor repositories
})
export class ProfessorModule {}
