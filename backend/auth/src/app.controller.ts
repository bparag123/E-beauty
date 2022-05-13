import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AppService } from './app.service';
import { LoginDTO } from './dto/loginDto';
import { LocalAuthGuard } from './guards/LocalAuthGuard';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}
  /**
   * Here I have applied Local Auth Guard So the validate Method of the Local Strategy will be called
   *So the body for the request is validated and the validated user is attached with the request object
   So here in this controller i can use the req.user
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body() loginDto: LoginDTO, @Req() req) {
    return this.appService.getToken(req.user);
  }

  /**
   * This method will be authenticate any request based on provided token
   */
  @MessagePattern('authenticate')
  authenticateRequest(@Payload() token: string, @Ctx() ctx: RmqContext) {
    return this.appService.validateToken(token);
  }
}
