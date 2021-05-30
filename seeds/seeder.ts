import { config as readEnvs } from 'dotenv';
import { createConnection } from 'typeorm';
import { getDatabaseConfig } from '../src/database/database.config';
import { User } from '../src/user/user.entity';
import { userFactory } from './factories/user.factory';
import { config } from './seed.config';

readEnvs();

const connectToDatabase = async () => {
  await createConnection(getDatabaseConfig());
};

const clearDatabase = async () => {
  await Promise.all([User].map((Entity) => Entity.delete({})));
};

const seedUsers = async () => {
  return Promise.all(
    new Array(config.users.numberOfUsers).fill(null).map((_, index) =>
      userFactory({
        email: `user-${index}@example.com`,
      }),
    ),
  );
};

const seed = async () => {
  await connectToDatabase();
  await clearDatabase();
  await seedUsers();
};

seed();
