import { Controller, Get } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('new_user')
  async sendMail(
    @Payload() data: any,
    @Ctx() ctx: RmqContext,
  ): Promise<string> {
    console.log("I'm sending Mail");
    try {
      const result = await this.appService.sendMail(data);
      console.log('Result is ', result);
      return result;
    } catch (error) {
      return error.message;
    }
  }
}
