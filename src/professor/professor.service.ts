import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import * as bcrypt from 'bcrypt';
import { Professor } from './entities/professor.entity';

@Injectable()
export class ProfessorService {
  constructor(
    @InjectRepository(Professor)
    private readonly professorRepository: Repository<Professor>,
  ) {}

  // Create a new professor
  async create(createProfessorDto: CreateProfessorDto): Promise<Professor> {
    // Check if a professor with the same email already exists
    const existingProfessor = await this.professorRepository.findOne({
      where: { email: createProfessorDto.email },
    });
    if (existingProfessor) {
      throw new ConflictException(
        'A professor with this email already exists.',
      );
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(createProfessorDto.password, 10);
    console.log(hashedPassword);

    // Create a new professor entity
    const professor = this.professorRepository.create({
      ...createProfessorDto,
      password: hashedPassword,
    });

    // Save the professor to the database
    try {
      return await this.professorRepository.save(professor);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create professor.');
    }
  }

  // Find all professors
  async findAll(): Promise<Professor[]> {
    try {
      return await this.professorRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch professors.');
    }
  }

  // Find a professor by ID
  async findOne(id: number): Promise<Professor> {
    const professor = await this.professorRepository.findOne({
      where: { id },
    });
    if (!professor) {
      throw new NotFoundException(`Professor with ID ${id} not found.`);
    }
    return professor;
  }

  // Update a professor by ID
  async update(
    id: number,
    updateProfessorDto: UpdateProfessorDto,
  ): Promise<Professor> {
    const professor = await this.findOne(id); // Check if the professor exists

    // Hash the password if it's being updated
    if (updateProfessorDto.password) {
      updateProfessorDto.password = await bcrypt.hash(
        updateProfessorDto.password,
        10,
      );
    }

    // Merge the updated data into the existing professor entity
    const updatedProfessor = this.professorRepository.merge(
      professor,
      updateProfessorDto,
    );

    // Save the updated professor
    try {
      return await this.professorRepository.save(updatedProfessor);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update professor.');
    }
  }

  // Delete a professor by ID
  async remove(id: number): Promise<void> {
    const professor = await this.findOne(id); // Check if the professor exists

    // Delete the professor
    try {
      await this.professorRepository.remove(professor);
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete professor.');
    }
  }
}
