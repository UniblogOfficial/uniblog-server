import { ROLES_KEY } from './roles-auth.decorator';
import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!requiredRoles) {
        return true;
      }
      const authHeader = req.headers.authorization;
      const [bearer, token] = authHeader.split(' ');
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'Unauthorized' });
      }
      const user = this.jwtService.verify(token);
      req.user = user;
      return user.roles.some(role => requiredRoles.includes(role.value));
    } catch (error) {
      throw new HttpException('Access forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
