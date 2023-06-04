import request from 'supertest';
import { server } from '../app/app';

let app: ReturnType<typeof request>;
beforeAll(async () => {
  // do something before anything else runs
  app = request(server);
  console.log('Jest starting!');
});
// close the server after each test
afterAll(() => {
  server.close();
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
    expect(response.status).toBe(401);
  });
});
