import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Professor = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.sub; // Extract the user property
  },
);
