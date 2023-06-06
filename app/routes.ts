import Router from 'koa-router';
import { UserEntity } from './models/Tenant.entity';
import { Repository, getRepository } from 'typeorm';
const router = new Router();
import appDataSource from './db';

/**
 * Base route, return a 401
 */
router.get('/', async (ctx) => (ctx.status = 401));

/**
 * Basic healthcheck
 */
router.get('/healthcheck', async (ctx) => (ctx.body = 'OK 2'));
router.get('/test1', async (ctx) => {
  const user: UserEntity = new UserEntity();
  user.firstName = 'fn';
  user.lastName = 'ln';
  user.age = 29;

  await appDataSource.manager.save(user);

  // Find the requested movie.
  //   const movies = await userRepo.find();
  ctx.body = { key: 'val' };
});

export const routes = router.routes();
