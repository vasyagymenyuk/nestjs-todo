import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Connection, createConnection } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, () => console.log('Server listening on 3000...'));
}
bootstrap();
