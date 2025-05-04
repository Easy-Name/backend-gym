import { Inject, Injectable } from '@nestjs/common';
import jwtConfig from './config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { Professor } from 'src/professor/entities/professor.entity';
import { ActiveUserData } from './interfaces/active-user-data.interface';

@Injectable()
export class GenerateTokensProvider {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        //audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.refreshTokenTtl,
      },
    );
  }

  public async generateTokens(professor: Professor) {
    const [accessToken, refreshToken] = await Promise.all([
      //Generate accessToken
      this.signToken<Partial<ActiveUserData>>(
        professor.id,
        this.jwtConfiguration.accessTokenTtl,
        {
          email: professor.email,
          role: professor.role,
        },
      ),
      //Generate refreshToken
      this.signToken(professor.id, this.jwtConfiguration.refreshTokenTtl),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
