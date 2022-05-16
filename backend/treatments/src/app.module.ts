import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TreatmentsModule } from './treatments/treatments.module';
import { ConfigModule } from '@nestjs/config';
import { configuration } from 'config/configuration';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { Cloudinary } from './cloudinary';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
      load: [configuration],
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    //Here I have registered the Client module to get the instance of the other service
    ClientsModule.register([
      {
        //This will be used as a Token for the Controller to Inject the Client Proxy
        name: 'TREATMENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URI],
          queue: 'treatment_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    TreatmentsModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService, Cloudinary],
})
export class AppModule {}
