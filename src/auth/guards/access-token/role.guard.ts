import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/auth/decorators/public.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector, // ✅ Add Reflector for @Public() decorator
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) {
      return true; // ✅ Skip auth check for public routes
    }

    const professor = (request as any).user; // Extract user from the request
    //console.log(professor);

    if (!professor) {
      throw new ForbiddenException('Access denied: No professor found.');
    }

    if (professor.role !== 'admin') {
      throw new ForbiddenException('Access denied: Admins only.');
    }

    return true;
  }
}
