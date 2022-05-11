import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configuration } from 'config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
