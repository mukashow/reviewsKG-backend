import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthResponse } from './dto/auth-response';
import { UserCreate } from './dto/user-create';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @ApiResponse({ type: AuthResponse })
  @Post()
  auth(@Body() dto: UserCreate) {
    return this.service.auth(dto);
  }
}
