import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const PORT = process.env.PORT ?? 5000;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => console.log(`Server listening on ${PORT}...`));
}
bootstrap();
