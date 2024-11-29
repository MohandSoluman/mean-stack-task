/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('API documentation for the authentication system')
    .setVersion('1.0')
    .addBearerAuth() // Add support for JWT authentication
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
  Logger.log(`Application is running on: http://localhost:3000`);
  Logger.log(`Swagger UI available at: http://localhost:3000/api`);
}
bootstrap();
