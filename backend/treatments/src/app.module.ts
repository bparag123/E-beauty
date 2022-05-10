import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TreatmentsModule } from './treatments/treatments.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/treatment'),
    //Here I have registered the Client module to get the instance of the other service
    ClientsModule.register([
      {
        //This will be used as a Token for the Controller to Inject the Client Proxy
        name: 'TREATMENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'treatment_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    TreatmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
