import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProfessorModule } from './professor/professor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professor } from './professor/entities/professor.entity';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    ProfessorModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Inject ConfigModule to use environment variables
      inject: [ConfigService], // Inject ConfigService to access environment variables
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql', // Database type (e.g., mysql, postgres, etc.)
        host: configService.get<string>('DB_HOST'), // Database host
        port: configService.get<number>('DB_PORT'), // Database port
        username: configService.get<string>('DB_USERNAME'), // Database username
        password: configService.get<string>('DB_PASSWORD'), // Database password
        database: configService.get<string>('DB_DATABASE'), // Database name
        entities: [Professor, User], // Add your entities here
        synchronize: configService.get<boolean>('DB_SYNC'), // Automatically synchronize database schema
      }),
    }),
  ],
})
export class AppModule {}
