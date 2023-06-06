import { DataSource } from 'typeorm';
import { UserEntity } from './models/Tenant.entity';

const appDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite3',
  synchronize: true,
  logging: true,
  entities: [UserEntity],
  subscribers: [],
  migrations: [],
});

export default appDataSource;
