import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserCreate } from './dto/user-create';
import { UsersService } from '../users/users.service';
import { AuthResponse } from './dto/auth-response';
import { User } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async auth({ phone }: UserCreate): Promise<AuthResponse> {
    let user = await this.userService.queryUserByPhone(phone);
    if (!user) {
      user = await this.userService.create(phone);
    }
    return this.generateToken(user);
  }

  private generateToken({ phone, id, service }: User): AuthResponse {
    return {
      access: this.jwtService.sign(
        { phone, id, service },
        { expiresIn: '15m' }
      ),
      refresh: this.jwtService.sign(
        { phone, id, service },
        { expiresIn: '180d' }
      ),
      phone,
      service,
    };
  }

  async refresh(user): Promise<AuthResponse> {
    return this.generateToken(user);
  }
}
