import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from './user.entity';
import { UsersService } from './users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string): Promise<User> {
    // 1) Check if email in use
    const users = await this.usersService.find(email);

    if (users.length) {
      throw new BadRequestException('email already in use');
    }

    // 2) Hash the password
    //  - Generate salt
    const salt = randomBytes(8).toString('hex');
    //  - Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    //  - Join the hashed result ( password+salt ) and the salt together
    const result = salt + '.' + hash.toString('hex');

    // 3) create and save user
    const user = await this.usersService.create(email, result);
    // 4) return the created user
    return user;
  }

  async signin(email: string, password: string): Promise<User> {
    // 1) Check if user exist
    const [user] = await this.usersService.find(email);
    if (!user) throw new NotFoundException('Invalid Credentials');

    // 2) Destruct stored salt and hashed (salt.password)
    const [salt, storedHashed] = user.password.split('.');

    // 3) Hash the incoming password
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // 4) Compare the Stored hashed password with the incoming hashed password
    if (storedHashed !== hash.toString('hex'))
      throw new NotFoundException('Invalid Credentials');

    return user;
  }
}
