import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles-auth-decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()]
      );
      if (!requiredRoles) return true;

      const authHeader = req.headers.authorization;
      const type = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (type !== 'Bearer' || !token) {
        throw new UnauthorizedException('not authorized');
      }
      const user = this.jwtService.verify(token);
      return !!user.roles.some(({ value }) => requiredRoles.includes(value));
    } catch (e) {
      throw new HttpException(
        'you do not have an access',
        HttpStatus.FORBIDDEN
      );
    }
  }
}
