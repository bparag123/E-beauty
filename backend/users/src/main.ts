import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { Transport } from '@nestjs/microservices';
config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      queue: 'user_queue',
      urls: ['amqp://guest:guest@rabbitmq:5672'],
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

  await app.listen(process.env.PORT);

  console.log(`User Service is Up and Running on Port ${process.env.PORT}`);
}
bootstrap();
