import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
const express = require('express');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();
  app.use('/static', express.static('uploads'))
  app.use('/img-car', express.static('users'))
  app.use('/emoji', express.static('emoji'))
  app.useStaticAssets(join(__dirname, '..', 'static'));



  await app.listen(8000);
}
bootstrap();
