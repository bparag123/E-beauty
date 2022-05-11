import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from 'config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
      load: [configuration],
    }),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_ID,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
