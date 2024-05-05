import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  const config = new DocumentBuilder()
    .setTitle('News Platform Service')
    .setDescription('News Platform Service')
    .setVersion('1.0')
    .addTag('News Platform')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('news-platform/api', app, document);
  await app.listen(5000);
}
bootstrap();
