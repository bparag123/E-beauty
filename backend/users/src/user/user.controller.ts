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
import { ClientProxy } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject('MAILER_SERVICE') private readonly mailer_client: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    console.log('POST controller');
    try {
      const result = await this.userService.create(createUserDto);
      console.log(result);
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
    console.log('Get controller');
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
}
