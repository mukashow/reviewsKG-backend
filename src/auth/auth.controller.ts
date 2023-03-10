import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthResponse } from './dto/auth-response';
import { UserCreate } from './dto/user-create';
import { JwtAuthGuard } from './jwt-auth-guard';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @ApiResponse({ type: AuthResponse })
  @Post()
  auth(@Body() dto: UserCreate) {
    return this.service.auth(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: AuthResponse })
  @Post('refresh')
  refresh(@Request() req) {
    return this.service.refresh(req.user);
  }
}
