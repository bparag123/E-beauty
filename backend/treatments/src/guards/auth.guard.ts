import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/allowUnauthorized.guard';

/**
 * This is a custom guard which is responsible to take the token from the request and pass
 * it to the auth microservice to verify
 */

export class AuthGuard implements CanActivate {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: ClientProxy,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
    ]);
    if (isPublic) {
      console.log('Skipping Auth Guards');
      return true;
    }
    const req = context.switchToHttp().getRequest();
    try {
      const res = await firstValueFrom(
        this.authService.send(
          'authenticate',
          req.headers['authorization']?.split(' ')[1],
        ),
      );
      console.log('Response from Auth Service', res);
      req.user = { email: res.email, _id: res._id, roles: res.roles };
      return true;
    } catch (err) {
      console.log('ERROR');
      return false;
    }
  }
}
