import { createConnection, getConnection } from 'typeorm';
import { getDatabaseConfig } from '../src/database/database.config';

process.env.NODE_ENV = 'test';
process.env.DATABASE = ':memory:';

const clearDatabase = async () => {
  let existingConnection;
  try {
    existingConnection = getConnection();
    // eslint-disable-next-line no-empty
  } catch {}

  if (!existingConnection) {
    await createConnection(getDatabaseConfig());
  }

  await getConnection().synchronize(true);
};

afterEach(clearDatabase);
beforeEach(clearDatabase);
