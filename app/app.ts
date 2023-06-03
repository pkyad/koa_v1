import * as Koa from 'koa';
import { koaBody } from 'koa-body';
import * as cors from '@koa/cors';
import { koaSwagger } from 'koa2-swagger-ui';

const serve = require('koa-static');
const koaValidator = require('koa-async-validator');
const koaBunyanLogger = require('koa-bunyan-logger');

import { config } from './config';
import { routes } from './routes';
import { logger } from './logger';

const app = new Koa();

app.use(koaBody());
app.use(koaValidator());
app.use(cors());
app.use(koaBunyanLogger(logger));
app.use(koaBunyanLogger.requestLogger());
app.use(koaBunyanLogger.timeContext());
app.use(routes);
app.use(serve('public'));
app.use(
  koaSwagger({
    routePrefix: '/swagger',
    swaggerOptions: {
      url: '/swagger.yml',
    },
  })
);

export const server = app.listen(config.port);

console.log(`Server running on port ${config.port}`);
