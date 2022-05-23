import { Roles } from 'src/schemas/user.schema';
import { IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @Exclude()
  roles: Roles;
}
