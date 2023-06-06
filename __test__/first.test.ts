import request from 'supertest';
import { server } from '../app/app';
import { classNames } from '@pkyad/jslib1';
import { UserEntity } from '../app/models/Tenant.entity';
import appDataSource from '../app/db';

let app: ReturnType<typeof request>;
beforeAll(async () => {
  // do something before anything else runs
  app = request(await server);
  console.log('Jest starting!');
  console.log(classNames('dsdas', 'second'));
});
// close the server after each test
afterAll(async () => {
  (await server).close();
  console.log('server closed!');
});

describe('first suite', () => {
  it('test 1', async () => {
    const response = await app.get('/healthcheck');
    expect(response.text).toBe('OK 2');
  });
  it('test 2', async () => {
    const response = await app.get('/test1');
    expect(response.body).toMatchObject({ key: 'val' });
  });
  it('checks if unauthorized', async () => {
    const response = await app.get('/');

    const allUsers = await appDataSource.manager.find(UserEntity);
    console.log(allUsers);
    expect(response.status).toBe(401);
  });
});
