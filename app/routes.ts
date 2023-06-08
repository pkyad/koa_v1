import Router from 'koa-router';
import models from '@/models';
const router = new Router();
import appDataSource from '@/db';
import { TestEntity, choice_fieldEnum } from '@/models';

/**
 * Base route, return a 401
 */
router.get('/', async (ctx) => (ctx.status = 401));

/**
 * Basic healthcheck
 */
router.get('/healthcheck', async (ctx) => (ctx.body = 'OK 2'));
router.get('/test1', async (ctx) => {
  const user: TestEntity = new TestEntity();
  user.bool_field = false;
  user.char_field = 'ln';
  user.positive_integer_field = 29;
  user.field3 = true;
  user.choice_field = choice_fieldEnum.choice1;

  await appDataSource.manager.save(user);
  models.forEach((m) => {
    console.log(m.name);
  });
  // Find the requested movie.
  //   const movies = await userRepo.find();
  ctx.body = { key: 'val' };
});

export const routes = router.routes();
