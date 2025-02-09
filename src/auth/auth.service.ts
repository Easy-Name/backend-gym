import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './dtos/signIn.dto';
import { HashingProvider } from './hashing.provider';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { RefreshTokensProvider } from './refresh-tokens-provider';
import { Professor } from 'src/professor/entities/professor.entity';
import { ProfessorService } from 'src/professor/professor.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => ProfessorService))
    private readonly professorService: ProfessorService,
    private readonly hashingProvider: HashingProvider,
    private readonly generateTokensProvider: GenerateTokensProvider,
    private readonly refreshTokensProvider: RefreshTokensProvider,
  ) {}

  public async signIn(signInDto: SignInDto) {
    //find the user using email ID
    let professor: Professor | undefined = undefined;
    professor = await this.professorService.findOneByEmail(signInDto.email);
    //throw an exception user not found

    if (!professor) {
      throw new NotFoundException('User not found');
    }
    //compare password to the hash

    let isEqual: boolean = false;

    try {
      isEqual = await this.hashingProvider.comparePassword(
        signInDto.password,
        professor.password,
      );
    } catch (error) {
      throw new RequestTimeoutException('Could not compare passwords');
    }
    if (!isEqual) {
      throw new UnauthorizedException('Incorrect password');
    }

    return await this.generateTokensProvider.generateTokens(professor);
  }

  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    return await this.refreshTokensProvider.refreshTokens(refreshTokenDto);
  }
}
