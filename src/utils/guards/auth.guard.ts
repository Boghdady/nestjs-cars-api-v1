import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // will return true if userId exist in the session
    if (request.session.userId) return true;
    else throw new UnauthorizedException('Unauthorized User');
    // return request.session.userId;
  }
}

// Note:
// in this admin guard we can't get  the currentUser from the CurrentUser interceptor
// because the interceptor run after the guard but so we use the middleware is put user in the request
// because middleware run before guard
