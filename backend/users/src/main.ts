import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      queue: 'user_queue',
      urls: [config.get('RABBITMQ_URI')],
      queueOptions: {
        durable: false,
      },
    },
  });

  try {
    await app.startAllMicroservices();
    console.log('User Microservice Started');
  } catch (error) {
    console.log('error occured');
  }

  await app.listen(config.get('PORT'));

  console.log(`User Service is Up and Running on Port ${config.get('PORT')}`);
}
bootstrap();
