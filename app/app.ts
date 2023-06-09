import { config } from '@/config';
import appDataSource from '@/db';
import { logger } from '@/logger';
import { routes } from '@/routes';
import { djangoService } from '@/services';
import cors from '@koa/cors';
import Koa from 'koa';
import { koaSwagger } from 'koa2-swagger-ui';
import { koaBody } from 'koa-body';
import serve from 'koa-static';
import 'reflect-metadata';

const koaValidator = require('koa-async-validator');
const koaBunyanLogger = require('koa-bunyan-logger');

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
      url: '/openapi.json',
      header: {
        display: 'none',
      },
    },
  })
);

export let server: Promise<ReturnType<typeof app.listen>> = new Promise(
  (resolve, _reject) => {
    appDataSource.initialize().then(() => {
      console.log('DB connected');
      resolve(app.listen(config.port));
      console.log(`Server running on port ${config.port}`);
      console.log('test handler running');
      djangoService.listtestView4s().then((res) => {
        console.log(res);
      });
    });
  }
);
