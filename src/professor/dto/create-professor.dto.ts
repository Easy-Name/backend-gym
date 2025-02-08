import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  Length,
  IsPhoneNumber,
  IsEmail,
  MinLength,
} from 'class-validator';

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
