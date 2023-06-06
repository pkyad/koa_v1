import Router from 'koa-router';
import { UserEntity } from './models/Tenant.entity';
import { Repository, getRepository } from 'typeorm';
const router = new Router();

/**
 * Base route, return a 401
 */
router.get('/', async (ctx) => (ctx.status = 401));

/**
 * Basic healthcheck
 */
router.get('/healthcheck', async (ctx) => (ctx.body = 'OK 2'));
router.get('/test1', async (ctx) => {
  const userRepo: Repository<UserEntity> = getRepository(UserEntity);

  const user: UserEntity = userRepo.create({
    firstName: '1',
    lastName: '2',
    age: 1,
  });

  // Persist it to the database.
  await userRepo.save(user);

  // Find the requested movie.
  //   const movies = await userRepo.find();
  ctx.body = { key: 'val' };
});

export const routes = router.routes();
