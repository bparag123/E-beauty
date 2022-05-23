import { Module } from '@nestjs/common';
import { TreatmentsService } from './treatments.service';
import { TreatmentsController } from './treatments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TreatmentSchema } from 'src/schemas/treatment.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { config } from 'dotenv';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from 'src/guards/auth.guard';
config({ path: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env` });
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Treatment', schema: TreatmentSchema }]),
    ClientsModule.register([
      {
        //This will be used as a Token for the Controller to Inject the Client Proxy
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URI],
          queue: 'auth_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    CloudinaryModule,
  ],
  controllers: [TreatmentsController],
  providers: [
    TreatmentsService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class TreatmentsModule {}
