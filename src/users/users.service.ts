import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(email: string, password: string) {
    // create instance of user entity that run hooks in entity
    const user = this.repo.create({ email, password });

    await this.repo.save(user);
  }

  async find(email: string): Promise<User[]> {
    return await this.repo.find({ email });
  }

  async findOne(id: number): Promise<User> {
    return await this.repo.findOne(id);
  }

  // save vs insert and update
  // save => make two operation on db but run the entity hooks
  // update, insert => make one operation on db but not run the entity hooks
  async update(id: number, attrs: Partial<User>): Promise<User> {
    const user: User = await this.findOne(id);
    if (!user) throw new Error(`User with this id:${id} not found`);

    Object.assign(user, attrs);

    return await this.repo.save(user);
  }

  // remove vs delete
  // remove => work with entity remove(Entity) so it runs the entity hooks
  // remover => make two trips to db
  // delete => work with search certeria delete(id) delete({email}) so it not run the hooks
  // delete => make one trip to db
  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) throw new Error(`User with this id: ${id} not found`);

    return await this.repo.remove(user);
  }
}
