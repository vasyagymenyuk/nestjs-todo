import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT ?? 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Todo service on NestJS')
    .setDescription('REST API Documentation')
    .setVersion('1.0.0')
    .addTag('NestAPP')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/v1/docs', app, document);

  await app.listen(PORT, () =>
    console.log(`Server listening on http://localhost:${PORT}/api/v1/...`),
  );
}
bootstrap();
