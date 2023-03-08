import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { ServiceResponse } from '../services/dto/service-response';
import { ServiceCRUDQuery } from '../services/dto/service-crud-query';

@ApiTags('Пользователи')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

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
