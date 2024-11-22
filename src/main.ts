import { NestFactory } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import configuration from './config/configuration';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
ConfigModule.forRoot();

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.setGlobalPrefix(configuration.prefix);
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });
  const config = new DocumentBuilder()
    .setTitle('Microservice Payments')
    .setDescription('The Microservice API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const urlDocs = `${configuration.prefix}/docs`;
  SwaggerModule.setup(urlDocs, app, document);
  await app.listen(configuration.port || 3000);
  if (process.env.NODE_ENV !== 'production') {
    logger.debug(
      `API Documentation available at http://localhost:${configuration.port}${urlDocs}`,
    );
  }
}

bootstrap();
