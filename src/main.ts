import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('/static', express.static(join(__dirname, '..', 'static')));

  await app.listen(3000);

  console.log('Project is running on: ' + (await app.getUrl()));
}
bootstrap();
