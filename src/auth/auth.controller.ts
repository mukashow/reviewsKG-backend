import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCreate } from './dto/user-create';
import { AuthService } from './auth.service';
import { User } from '../users/users.model';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @ApiOperation({ summary: 'Авторизация' })
  @ApiResponse({ type: User, status: 200 })
  @Post()
  auth(@Body() dto: UserCreate) {
    return this.service.auth(dto);
  }
}
