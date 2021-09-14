import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';

// Param decorators exist outside the DI system, so our decorator can not get an instance of
// UserService directly, so we use interceptor to access UserService because the interceptors are
// part of DI system
// Put this interceptor to provider because is Injectable class that use DI system
@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userServices: UsersService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    // 1- Run something before a request is handled by the request handler
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    if (userId) {
      const user = await this.userServices.findOne(userId);
      request.currentUser = user;
    }
    return next.handle();
  }
}
