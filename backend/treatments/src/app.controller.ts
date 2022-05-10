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

  @Get()
  @MessagePattern('test')
  getHello(@Payload() data: any, @Ctx() context: RmqContext): string {
    console.log('Its Data from other service', data);
    return this.appService.getHello();
  }
}
