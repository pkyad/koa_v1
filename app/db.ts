import { DataSource } from 'typeorm';
import models from './models';

const appDataSource = new DataSource({
  type: 'postgres',
  host: '192.168.10.202',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'django',
  synchronize: false,
  logging: true,
  entities: models,
  subscribers: [],
  migrations: [],
});

export default appDataSource;
