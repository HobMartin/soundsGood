import { registerAs } from '@nestjs/config';

const isDevelopment = process.env.NODE_ENV !== 'production';

/**
 * Mongo database connection config
 */
export default registerAs('mongodb', () => {
  const { DB_PORT, DB_HOST, DB_NAME, DB_USER, DB_PASS } = process.env;
  return {
    uri: isDevelopment
      ? `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`
      : `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
  };
});
