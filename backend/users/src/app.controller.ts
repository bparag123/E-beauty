import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('TREATMENT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    console.log(this.client);
    this.client.emit('test', "Hello I'm From User");
    return this.appService.getHello();
  }
}
