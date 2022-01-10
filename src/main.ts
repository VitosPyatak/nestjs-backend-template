import './prototypes/index';
import * as compression from 'compression';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { validationPipeOptions } from './app.configs';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

const initializeMiddlewaresAndPipes = (app: NestExpressApplication) => {
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
};

const initializeHandlebars = (app: NestExpressApplication) => {
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
};

const initializeUtils = (app: NestExpressApplication) => {
  app.use(compression());
  app.enableCors();
};

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  initializeMiddlewaresAndPipes(app);
  initializeUtils(app);
  initializeHandlebars(app);
  await app.listen(process.env.PORT || 4000);
})();
