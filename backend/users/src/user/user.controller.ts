import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ClientProxy,
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject('MAILER_SERVICE') private readonly mailer_client: ClientProxy,
  ) {}

  //This method will create new user and emit the event to mailer service to send welcome Mail
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const result = await this.userService.create(createUserDto);
      if (result) {
        this.mailer_client.emit('new_user', result);
        return result;
      }
      return "Couldn't Create User";
    } catch (error) {
      return error;
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  /**
   * This method will validate the user data which is provided by the auth service
   */
  @MessagePattern('validate_user')
  async validateUser(@Payload() data, @Ctx() ctx: RmqContext) {
    console.log('User Service Called ', data);
    const userData = await this.userService.validateUser(data);
    console.log(userData);
    if (!userData) {
      return null;
    }
    return userData;
  }
}
