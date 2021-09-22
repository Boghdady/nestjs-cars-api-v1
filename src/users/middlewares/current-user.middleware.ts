import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}
  async use(req: Request, res: Response, next: () => void) {
    const { userId } = req.session || {};
    if (!userId) {
      throw new UnauthorizedException('Unauthenticated user, please login');
    }
    const user = await this.usersService.findOne(userId);
    // @ts-ignore
    req.currentUser = user;

    next();
  }
}
