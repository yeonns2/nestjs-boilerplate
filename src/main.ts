import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';
import { WebhookInterceptor } from './util/interceptor/webhook.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger 설정
  const swaggerDocumentBuilder = new DocumentBuilder()
    .setTitle('NestJS boilerplate API Docs')
    .setDescription('NestJS boilerplate API description')
    .setVersion('1.0')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerDocumentBuilder,
  );
  SwaggerModule.setup('api', app, swaggerDocument);

  // Sentry 설정
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
  });
  app.useGlobalInterceptors(new WebhookInterceptor());

  await app.listen(3000);
}
bootstrap();
