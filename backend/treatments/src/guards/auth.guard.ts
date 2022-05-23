import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

/**
 * This is a custom guard which is responsible to take the token from the request and pass
 * it to the auth microservice to verify
 */

export class AuthGuard implements CanActivate {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('Auth Guard Runs');
    const req = context.switchToHttp().getRequest();
    try {
      const res = await firstValueFrom(
        this.authService.send(
          'authenticate',
          req.headers['authorization']?.split(' ')[1],
        ),
      );
      console.log(res);
      req.user = { email: res.email, _id: res._id, roles: res.roles };
      return true;
    } catch (err) {
      console.log('ERROR');
      return false;
    }
  }
}
