import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Professor } from 'src/professor/entities/professor.entity';
import { User } from './entities/user.entity';
import { CreateOwnUserDto } from './dto/create-own-user.dto';
import { UpdateOwnUserDto } from './dto/update-own-user.dto';

@Injectable()
export class UsersOwnProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Professor)
    private readonly professorRepository: Repository<Professor>,
  ) {}

  // Create a new user
  async create(
    createOwnUserDto: CreateOwnUserDto,
    profId: number,
  ): Promise<User> {
    // Check if the professor exists
    const professor = await this.professorRepository.findOne({
      where: { id: profId },
    });
    if (!professor) {
      throw new NotFoundException(`Professor with ID ${profId} not found.`);
    }

    // Check if a user with the same email or telephone already exists for this professor
    const existingUserWithEmail = await this.userRepository.findOne({
      where: {
        email: createOwnUserDto.email,
        professor: { id: profId },
      },
    });

    const existingUserWithTelephone = await this.userRepository.findOne({
      where: {
        telephone: createOwnUserDto.telephone,
        professor: { id: profId },
      },
    });

    // Build the error message based on the conflicts
    let errorMessage = '';
    if (existingUserWithEmail && existingUserWithTelephone) {
      errorMessage =
        'A user with this email and telephone number already exists for the specified professor.';
    } else if (existingUserWithEmail) {
      errorMessage =
        'A user with this email already exists for the specified professor.';
    } else if (existingUserWithTelephone) {
      errorMessage =
        'A user with this telephone number already exists for the specified professor.';
    }

    // Throw a ConflictException if there is a conflict
    if (errorMessage) {
      throw new ConflictException(errorMessage);
    }

    // Create a new user entity
    const user = this.userRepository.create({
      ...createOwnUserDto,
      professorId: profId,
      professor, // Associate the user with the professor
    });

    // Save the user to the database
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user.');
    }
  }

  // Find all users
  async findAll(profId: number): Promise<User[]> {
    try {
      return await this.userRepository.find({
        relations: ['professor'],
        where: { professorId: profId },
      }); // Include the professor relation
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch users.');
    }
  }

  // Find a user by ID
  async findOne(id: number, profId: number): Promise<User> {
    if (!id || id <= 0) {
      throw new BadRequestException('Invalid ID provided');
    }
    const user = await this.userRepository.findOne({
      where: { id, professorId: profId },
      relations: ['professor'], // Include the professor relation
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return user;
  }

  // Update a user by ID
  async update(
    id: number,
    updateOwnUserDto: UpdateOwnUserDto,
    profId: number,
  ): Promise<User> {
    if (!id || id <= 0) {
      throw new BadRequestException('Invalid ID provided');
    }
    const user = await this.findOne(id, profId); // Check if the user exists

    // Check if the associated professor exists (if professorId is being updated)
    if (profId) {
      const professor = await this.professorRepository.findOne({
        where: { id: profId },
      });
      if (!professor) {
        throw new NotFoundException(`Professor with ID ${profId} not found.`);
      }
      user.professor = professor; // Associate the user with the new professor
    }

    // Merge the updated data into the existing user entity
    const updatedUser = this.userRepository.merge(user, updateOwnUserDto);

    // Save the updated user
    try {
      return await this.userRepository.save(updatedUser);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update user.');
    }
  }

  // Delete a user by ID
  async remove(id: number, profId: number): Promise<void> {
    if (!id || id <= 0) {
      throw new BadRequestException('Invalid ID provided');
    }
    const user = await this.findOne(id, profId); // Check if the user exists

    if (!user) {
      throw new NotFoundException('The user does not exist.');
    }

    // Delete the user
    try {
      await this.userRepository.remove(user);
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete user.');
    }
  }
}
