import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  Length,
  IsPhoneNumber,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 96)
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 96)
  lastName: string;

  @ApiProperty()
  @IsPhoneNumber('BR') // Validates phone number format
  @IsNotEmpty()
  telephone: string;

  @ApiProperty()
  @IsEmail() // Validates email format
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  professorId: number; // Foreign key for the professor
}
