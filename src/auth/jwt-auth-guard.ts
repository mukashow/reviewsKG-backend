import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import * as process from 'process';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const authHeader = req.headers.authorization;
      const token = authHeader.split(' ')[1];

      if (!token) return true;
      req.user = this.jwtService.verify(token);
      return true;
    } catch (e) {
      throw new UnauthorizedException('Not authorized');
    }
  }
}

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    if (req.headers['x-api-key'] !== process.env.API_KEY) {
      throw new ForbiddenException('You do not have an access');
    }
    return true;
  }
}
