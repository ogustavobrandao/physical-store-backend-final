import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  autoLoadModels: true, 
  synchronize: true
}));