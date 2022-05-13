import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async findAll() {
    return await this.userModel.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  //This method checks the email and password for the user
  async validateUser(data) {
    const { email: userEmail, password: userPassword } = data;
    console.log('Validate User Service', userEmail, userPassword);
    const user = await this.userModel.findOne({ email: userEmail });
    console.log(user);
    if (!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(userPassword, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return null;
    }
    console.log(user);
    const { email, _id } = user;
    return { email, _id };
  }
}
