import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Param decorators exist outside the DI system, so our decorator can not get an instance of
// UserService directly, so we use interceptor to access UserService because the interceptors are
// part of DI system
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.currentUser;
  },
);
