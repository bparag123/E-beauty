import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class AppService {
  constructor(private mailService: MailerService) {}

  async sendMail(data): Promise<string> {
    try {
      await this.mailService.sendMail({
        from: 'pkbkmb@gmail.com',
        to: data.email,
        subject: 'Testing Microservice',
        text: `Hello ${data.username}! This is Mail from Microservice`,
      });
      return Promise.resolve('Email Sent');
    } catch (error) {
      return Promise.reject("Couldn't Send Email");
    }
  }
}
