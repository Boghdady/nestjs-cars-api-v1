import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.currentUser) {
      throw new UnauthorizedException('UnAuthenticated user. please login');
    }
    if (!request.currentUser.admin) {
      throw new UnauthorizedException(
        'You have now permission to this action, only admin can perform this action',
      );
    }
    return request.currentUser.admin;
  }
}
