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

  // async auth({ phone }: UserCreate) {
  //   let user = await this.userService.getUserByPhone(phone);
  //   if (!user) {
  //     user = await this.userService.create(phone);
  //   }
  //   return this.generateToken(user);
  // }

  async auth({ phone }: UserCreate) {
    const user = await this.userService.getUserByPhone(phone);
    if (!user) {
      await this.userService.create(phone);
      return await this.userService.getUserByPhone(phone);
    }
    return user;
  }

  private generateToken({ phone, id, service }: User): AuthResponse {
    // return {
    //   access: this.jwtService.sign({ phone, id, services }),
    //   refresh: this.jwtService.sign(
    //     { phone, id, services },
    //     { expiresIn: '180d' }
    //   ),
    //   phone,
    //   services,
    // };
    return;
  }

  async refresh(user) {
    return this.generateToken(user);
  }
}
