import { NestApplication, NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

let app: NestApplication;

// Graceful shutdown
const shutdown = async () => {
  console.log('Shutting down...');
  await app.close();
  process.exit(0);
};

async function bootstrap() {
  app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 4001);

  const logger = new Logger('Bootstrap');

  const config = new DocumentBuilder()
    .setTitle('Calculations Service')
    .setDescription('API for calculations service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  await app.listen(port);

  logger.log(`Application is running on: http://localhost:${port}`);
  logger.log(`Swagger is running on: http://localhost:${port}/docs`);

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

bootstrap();
