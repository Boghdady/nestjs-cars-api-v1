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
