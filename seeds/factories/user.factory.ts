import faker from 'faker';

import { User } from '../../src/user/user.entity';
import argon2 from 'argon2';
import { config } from '../seed.config';

export const userFactory = async (user?: Partial<User>): Promise<User> => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  return User.create({
    email: faker.internet.email(firstName, lastName),
    ...user,
    password: await argon2.hash(user?.password ?? config.users.defaultPassword),
  }).save();
};
