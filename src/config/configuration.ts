export default (): Config => ({
  jwtSecret: process.env.JWT_SECRET,
  database: process.env.DATABASE ?? DEFAULT_DATABASE,
});

export type Config = {
  jwtSecret: string;
  database: string;
};

export const DEFAULT_DATABASE = './data/database.sq3';
