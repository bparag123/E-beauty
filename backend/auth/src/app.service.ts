import { Inject, Injectable, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('USER_SERVICE') private userService: ClientProxy,
  ) {}

  /**
   * This method signs the jwt token
   */
  getToken(data) {
    console.log('Data during token generation', data);
    return {
      access_token: this.jwtService.sign({
        email: data.email,
        _id: data._id,
        roles: data.roles,
      }),
      roles: data.roles,
    };
  }

  /**
   * This method sends the username and password to the user microservice to validate
   */
  async validateUser(email: string, password: string) {
    const responseUser = await firstValueFrom(
      this.userService.send('validate_user', {
        email,
        password,
      }),
    );
    console.log('Response From User Service', responseUser);
    return responseUser;
  }

  validateToken(token: string) {
    return this.jwtService.verify(token);
  }
}
