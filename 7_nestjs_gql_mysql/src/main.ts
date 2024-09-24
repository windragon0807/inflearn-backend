import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { graphqlUploadExpress } from 'graphql-upload';

/**
 * Nest.js Request Lifecycle
 * https://ru-nestjs-docs.netlify.app/faq/request-lifecycle#summary
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* Pipe : 데이터가 오고가는 흐름에 있어서 데이터 검증과 필터링을 해주는 역할 */
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(graphqlUploadExpress());

  await app.listen(3000);
}

bootstrap();
