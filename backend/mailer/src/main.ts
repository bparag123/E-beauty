import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      queue: 'mailer_queue',
      urls: [config.get('RABBITMQ_URI')],
      queueOptions: {
        durable: false,
      },
    },
  });

  try {
    await app.startAllMicroservices();
    console.log('Mailer Microservice Started');
  } catch (error) {
    console.log("Couldn't Start Mailer Microservice");
  }

  await app.listen(config.get('PORT'));

  console.log(`Mailer Service is Up and Running on Port ${config.get('PORT')}`);
}
bootstrap();
