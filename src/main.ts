import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const server = await NestFactory.create(AppModule);
  const  logger = new Logger();
  server.setGlobalPrefix('api')

  server.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
    })
  );
  await server.listen(3000);
  logger.log(`server is running in localhost:${await server.getUrl()}`);
}
bootstrap();
