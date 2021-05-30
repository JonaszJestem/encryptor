import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserNotFoundException } from './user.errors';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async getUserByEmail(email: string): Promise<User> {
    const user = await this.findOne({ where: { email } });

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }
}
