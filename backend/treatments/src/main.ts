import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.enableCors({ origin: 'http://localhost:3002' });
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      queue: 'treatment_queue',
      urls: [config.get('RABBITMQ_URI')],
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

  await app.listen(config.get('PORT'));

  console.log(
    `Treatment Service is Up and Running on Port ${config.get('PORT')}`,
  );
}
bootstrap();
