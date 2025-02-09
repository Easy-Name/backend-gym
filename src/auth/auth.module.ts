import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { BcryptProvider } from './bcrypt.provider';
import jwtConfig from './config/jwt.config';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { HashingProvider } from './hashing.provider';
import { RefreshTokensProvider } from './refresh-tokens-provider';
import { ProfessorModule } from 'src/professor/professor.module';
import { AccessTokenGuard } from './guards/access-token/access-token.guard';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
    GenerateTokensProvider,
    RefreshTokensProvider,
    AccessTokenGuard,
  ],
  imports: [
    forwardRef(() => ProfessorModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  exports: [AuthService, HashingProvider, JwtModule, AccessTokenGuard],
})
export class AuthModule {}
