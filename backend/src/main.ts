import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS: use CORS_ORIGIN env (e.g. "*" or "http://vm-ip:3000") or default to localhost for dev
  const corsOrigin = process.env.CORS_ORIGIN;
  const origin = corsOrigin === '*'
    ? true
    : corsOrigin
      ? corsOrigin.split(',').map((o) => o.trim())
      : ['http://localhost:5173', 'http://localhost:3000'];
  app.enableCors({ origin });

  // Set backend port to 3001 (different from frontend)
  await app.listen(3001);
  console.log(`Backend is running on http://localhost:3001`);
}

bootstrap();