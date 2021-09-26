import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from '../user.entity';
import { UsersService } from '../users.service';

// Add property to existing interface (Request)
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}
  async use(req: Request, res: Response, next: () => void) {
    const { userId } = req.session || {};
    if (!userId) {
      throw new UnauthorizedException('Unauthenticated user, please login');
    }
    const user = await this.usersService.findOne(userId);
    req.currentUser = user;

    next();
  }
}
