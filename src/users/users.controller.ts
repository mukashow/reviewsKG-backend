import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { ServiceResponse } from '../services/dto/service-response';
import { ServiceCRUDQuery } from '../services/dto/service-crud-query';
import { UserGetResponse } from './dto/user-get-response';
import { UserQuery } from './dto/user-query';
import { UserSearch } from './dto/user-search';

@ApiTags('Пользователи')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiResponse({ type: UserGetResponse })
  @Get(':phone')
  async getUserByPhone(@Param() { phone }: UserQuery) {
    return await this.usersService.getUserByPhone(phone);
  }

  @ApiResponse({ type: [UserGetResponse] })
  @Get('search/users')
  @UsePipes(new ValidationPipe({ transform: true }))
  async searchUsersByPhone(@Query() { q, service }: UserSearch) {
    return await this.usersService.searchUsersByPhone(q, service);
  }

  @ApiResponse({ type: [ServiceResponse] })
  @Get('services')
  async getServices(@Request() req) {
    return await this.usersService.getServices(req.user.id);
  }

  @ApiResponse({ type: ServiceResponse })
  @Post('services/:id')
  async addService(@Request() req, @Param() { id }: ServiceCRUDQuery) {
    return await this.usersService.addService(req.user.id, Number(id));
  }

  @ApiResponse({ type: [ServiceResponse] })
  @Delete('services/:id')
  async removeService(@Request() req, @Param() { id }: ServiceCRUDQuery) {
    return await this.usersService.removeService(req.user.id, Number(id));
  }
}
