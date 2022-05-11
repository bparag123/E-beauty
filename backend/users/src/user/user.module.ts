import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
// Setup for Configuration
//The Config Module is not available in this module file
import { config } from 'dotenv';
config({ path: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env` });

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ClientsModule.register([
      {
        //This will be used as a Token for the Controller to Inject the Client Proxy
        name: 'MAILER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URI],
          queue: 'mailer_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
