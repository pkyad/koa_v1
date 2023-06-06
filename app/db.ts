import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import { UserEntity } from './models/Tenant.entity';

const connectionOpts: ConnectionOptions = {
  type: 'sqlite',
  database: 'db.sqlite3',
  synchronize: true,
  logging: true,
  entities: [UserEntity],
  subscribers: [],
  migrations: [],
};

const connection: Promise<Connection> = createConnection(connectionOpts);

export default connection;
