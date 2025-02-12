import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createDatabase } from './database.provider';


async function bootstrap() {
  await createDatabase(); // Cria o banco antes de iniciar o NestJS
  const app = await NestFactory.create(AppModule);
  await app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
