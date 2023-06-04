import Router from 'koa-router';

const router = new Router();

/**
 * Base route, return a 401
 */
router.get('/', async (ctx) => (ctx.status = 401));

/**
 * Basic healthcheck
 */
router.get('/healthcheck', async (ctx) => (ctx.body = 'OK 2'));
router.get('/test1', async (ctx) => (ctx.body = { key: 'val' }));

export const routes = router.routes();
