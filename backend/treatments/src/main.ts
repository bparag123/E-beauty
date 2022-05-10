import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
config();
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      queue: 'treatment_queue',
      urls: ['amqp://guest:guest@rabbitmq:5672'],
      queueOptions: {
        durable: false,
      },
    },
  });
  try {
    await app.startAllMicroservices();
    console.log('Treatment Microservice Started');
  } catch (error) {
    console.log('error occured');
  }

  await app.listen(process.env.PORT);

  console.log(
    `Treatment Service is Up and Running on Port ${process.env.PORT}`,
  );
}
bootstrap();
