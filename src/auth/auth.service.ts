import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserCreate } from './dto/user-create';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.model';
import { AuthResponse } from './dto/auth-response';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async auth({ phone }: UserCreate) {
    let user = await this.userService.getUserByPhone(phone);
    if (!user) {
      user = await this.userService.create(phone);
    }
    return this.generateToken(user);
  }

  private generateToken({ phone, id }: User): AuthResponse {
    return {
      access: this.jwtService.sign({ phone, id }, { expiresIn: '5h' }),
      refresh: this.jwtService.sign({ phone, id }, { expiresIn: '90d' }),
      phone,
    };
  }
  // async login({ email, password }: UserCreate) {
  //   const user = await this.userService.getByEmail(email);
  //   if (!user) {
  //     throw new HttpException(
  //       'no such email registered',
  //       HttpStatus.BAD_REQUEST
  //     );
  //   }
  //
  //   const passwordEqual = await bcrypt.compare(password, user.password);
  //   if (!passwordEqual) {
  //     throw new UnauthorizedException({ message: 'wrong credentials' });
  //   }
  //
  //   return this.generateToken(user);
  // }

  // async registration({ email, password }: UserCreate) {
  //   const candidate = await this.userService.getByEmail(email);
  //
  //   if (candidate) {
  //     throw new HttpException(
  //       'this email is already exist',
  //       HttpStatus.BAD_REQUEST
  //     );
  //   }
  //
  //   const hashPassword = await bcrypt.hash(password, 5);
  //   const user = await this.userService.create({
  //     email,
  //     password: hashPassword,
  //   });
  //   return this.generateToken(user);
  // }
  //
}
