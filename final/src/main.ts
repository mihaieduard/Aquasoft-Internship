import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

dotenv.config(); // This loads the .env file
console.log('JWT_SECRET:', process.env.JWT_SECRET); 
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();

