import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { JwtService } from '@nestjs/jwt';
import { ProfessorService } from 'src/professor/professor.service';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { ActiveUserData } from './interfaces/active-user-data.interface';

@Injectable()
export class RefreshTokensProvider {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    @Inject(forwardRef(() => ProfessorService))
    private readonly professorService: ProfessorService,
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      //verify the refresh token that has been sent by the user using jwtService
      const { sub } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'>
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        //audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });
      //fetch professor from database

      const professor = await this.professorService.findOne(sub);
      //create the token

      return await this.generateTokensProvider.generateTokens(professor);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
