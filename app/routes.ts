import Router from 'koa-router';
import models from '@/models';
const router = new Router();
import appDataSource from '@/db';
import { TestEntity, choice_fieldEnum } from '@/models';
import prom from '@/measure';
import { Context } from 'koa';
import swaggerJsdoc from 'swagger-jsdoc';
import { djangoService } from './services';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World',
      version: '1.0.0',
    },
  },
  apis: ['./app/routes*.ts'], // files containing annotations as above
};

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
router.get('/healthcheck', async (ctx) => {
  ctx.body = 'OK 2';
});

/**
 * Blend two colors together.
 * @method
 * @param {string} color1 - The first color, in hexadecimal format.
 * @param {string} color2 - The second color, in hexadecimal format.
 * @return {string} The blended color.
 * @example
 * var x = foo("test"); //it will show "test" message
 * const response = await fetch(URL)
 * const data = await response.json()
 * data.map((d)=> {...d, id : d.pk})
 */
function testFn() {}

/**
 * @swagger
 * /test1:
 *  get:
 *    description: Returns the current user meta data in json edited
 *    operationId: getCurrentSession
 *    responses:
 *       200:
 *         description: returns current user object, should only be called
 *          once for a entire load or after sign in
 *       401:
 *         description: if the jwt token is not present in the cookie or its invalid
 */
const testHandler = async (ctx: Context) => {
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
};

router.get('/test1', testHandler);
router.get('/openapi.json', (ctx) => {
  const openapiSpecification = swaggerJsdoc(options);
  ctx.body = openapiSpecification;
  console.log(openapiSpecification);
});

/**
 * @param {Context} ctx
 */
const promHandler = async (ctx: Context) =>
  (ctx.body = await prom.register.metrics());

router.get('/metrics', promHandler);

export const routes = router.routes();
