import Router from 'koa-router';
import models from '@/models';
const router = new Router();
import appDataSource from '@/db';
import { TestEntity, choice_fieldEnum } from '@/models';
import prom from '@/measure';

const todocounter = new prom.Counter({
  name: 'forethought_number_of_todos_total',
  help: 'The number of items added to the to-do list, total',
});

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
  todocounter.inc();
  await appDataSource.manager.save(user);
  models.forEach((m) => {
    console.log(m.name);
  });
  // Find the requested movie.
  //   const movies = await userRepo.find();
  ctx.body = { key: 'val' };
});

router.get(
  '/metrics',
  async (ctx) => (ctx.body = await prom.register.metrics())
);

export const routes = router.routes();
