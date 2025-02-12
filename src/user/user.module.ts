import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professor } from 'src/professor/entities/professor.entity';
import { User } from './entities/user.entity';
import { UsersOwnProvider } from './user-own.provider';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersOwnProvider],
  imports: [TypeOrmModule.forFeature([User, Professor])], // Add User and Professor repositories
})
export class UsersModule {}
