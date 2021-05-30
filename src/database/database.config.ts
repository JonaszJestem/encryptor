import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const getDatabaseConfig = (): any => ({
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],

  type: 'sqlite',
  database: process.env.DATABASE,
  keepConnectionAlive: true,
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
});
