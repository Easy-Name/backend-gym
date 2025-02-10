import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  Length,
  IsPhoneNumber,
  IsEmail,
  MinLength,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { ProfessorRole } from '../entities/professor-role.enum';

export class CreateProfessorDto {
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
  @IsPhoneNumber('BR')
  @IsNotEmpty()
  telephone: string;

  //@ApiProperty({ enum: ProfessorRole })
  @IsEnum(ProfessorRole, { message: 'role must be either admin or user' })
  @IsOptional()
  role?: ProfessorRole;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8) // Minimum password length
  password: string;
}
