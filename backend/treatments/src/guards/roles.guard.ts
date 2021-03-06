import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/roles.decorators';
import { Role } from 'src/enums/role.enum';
import { IS_PUBLIC_KEY } from '../decorators/public.guard';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
    ]);
    //Checking the metadata is Public
    if (isPublic) {
      console.log('Skipping Roles Guards');
      return true;
    }
    console.log('Role Guard Continue');
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
    ]);
    //Checking The Role Metadata
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    console.log('User with Role', user);

    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
