import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Professor } from 'src/professor/entities/professor.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Professor)
    private readonly professorRepository: Repository<Professor>,
  ) {}

  // Create a new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if the professor exists
    const professor = await this.professorRepository.findOne({
      where: { id: createUserDto.professorId },
    });
    if (!professor) {
      throw new NotFoundException(
        `Professor with ID ${createUserDto.professorId} not found.`,
      );
    }

    // Check if a user with the same email or telephone already exists for this professor
    const existingUserWithEmail = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
        professor: { id: createUserDto.professorId },
      },
    });

    const existingUserWithTelephone = await this.userRepository.findOne({
      where: {
        telephone: createUserDto.telephone,
        professor: { id: createUserDto.professorId },
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
      ...createUserDto,
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
  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find({ relations: ['professor'] }); // Include the professor relation
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch users.');
    }
  }

  // Find a user by ID
  async findOne(id: number): Promise<User> {
    if (!id || id <= 0) {
      throw new BadRequestException('Invalid ID provided');
    }
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['professor'], // Include the professor relation
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return user;
  }

  // Update a user by ID
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    if (!id || id <= 0) {
      throw new BadRequestException('Invalid ID provided');
    }
    const user = await this.findOne(id); // Check if the user exists

    // Check if the associated professor exists (if professorId is being updated)
    if (updateUserDto.professorId) {
      const professor = await this.professorRepository.findOne({
        where: { id: updateUserDto.professorId },
      });
      if (!professor) {
        throw new NotFoundException(
          `Professor with ID ${updateUserDto.professorId} not found.`,
        );
      }
      user.professor = professor; // Associate the user with the new professor
    }

    // Merge the updated data into the existing user entity
    const updatedUser = this.userRepository.merge(user, updateUserDto);

    // Save the updated user
    try {
      return await this.userRepository.save(updatedUser);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update user.');
    }
  }

  // Delete a user by ID
  async remove(id: number): Promise<void> {
    if (!id || id <= 0) {
      throw new BadRequestException('Invalid ID provided');
    }
    const user = await this.findOne(id); // Check if the user exists

    if (!user) {
      throw new NotFoundException('The exercise does not exist.');
    }

    // Delete the user
    try {
      await this.userRepository.remove(user);
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete user.');
    }
  }
}
