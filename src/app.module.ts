import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProfessorModule } from './professor/professor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professor } from './professor/entities/professor.entity';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AccessTokenGuard } from './auth/guards/access-token/access-token.guard';
import { ExerciseModule } from './exercise/exercise.module';
import { Exercise } from './exercise/entities/exercise.entity';
import { TrainingPlanModule } from './training-plan/training-plan.module';
import { TrainingPlan } from './training-plan/entities/training-plan.entity';
import { PlanCompositionModule } from './plan-composition/plan-composition.module';
import { PlanComposition } from './plan-composition/entities/plan-composition.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    ProfessorModule,
    ExerciseModule,
    AuthModule,
    TrainingPlanModule,
    PlanCompositionModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [Professor, User, Exercise, TrainingPlan, PlanComposition],
        synchronize: configService.get<boolean>('DB_SYNC'),
      }),
    }),
  ],
  providers: [
    { provide: APP_GUARD, useClass: AccessTokenGuard },
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
})
export class AppModule {}
