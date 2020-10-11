import { ValidationPipe, INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import commonConfig from './config/common.config';
// import { join } from 'path'
// import * as express from 'express';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  // pips
  app.useGlobalPipes(new ValidationPipe());
  // intercptors
  app.useGlobalInterceptors(new TransformInterceptor());
  // prefix
  app.setGlobalPrefix(`/api/${commonConfig.version}`);

  await app.listen(commonConfig.port);
}
bootstrap();
