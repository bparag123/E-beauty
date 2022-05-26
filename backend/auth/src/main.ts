import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.enableCors({ origin: 'http://localhost:3002' });
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      queue: 'auth_queue',
      urls: [config.get('RABBITMQ_URI')],
      queueOptions: {
        durable: false,
      },
    },
  });
  try {
    await app.startAllMicroservices();
    console.log('Auth Microservice Started');
  } catch (error) {
    console.log('error occured');
  }

  await app.listen(config.get('PORT'));

  console.log(`Auth Service is Up and Running on Port ${config.get('PORT')}`);
}
try {
  bootstrap();
} catch (error) {
  console.log(error.message);
}
