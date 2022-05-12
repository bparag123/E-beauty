import { Controller, Get } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  //This function will rigger when any other service send the event 'new_user
  @EventPattern('new_user')
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
