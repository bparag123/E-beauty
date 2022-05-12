import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private appService: AppService) {
    super({ usernameField: 'email' });
  }

  /**
   * This method will run when the guard is called
   * The return value of this method is set as a req.user value
   */
  async validate(email: string, password: string): Promise<any> {
    const user = await this.appService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
