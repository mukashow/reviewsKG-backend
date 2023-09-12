import {
  Controller,
  Get,
  UseGuards,
  Request,
  Param,
  Delete,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { ServiceResponse } from '../services/dto/service-response';
import { ServiceCRUDQuery } from '../services/dto/service-crud-query';
import { UserGetResponse } from './dto/user-get-response';
import { UserQuery } from './dto/user-query';

@ApiTags('Пользователи')
// @UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiResponse({ type: UserGetResponse })
  @Get(':phone/info')
  async getUserByPhone(@Param() { phone }: UserQuery) {
    try {
      return await this.usersService.getUserByPhone(phone);
    } catch (e) {
      throw new NotFoundException();
    }
  }

  @ApiResponse({ type: ServiceResponse })
  @Put('services/:id')
  async updateService(@Request() req, @Param() { id }: ServiceCRUDQuery) {
    return await this.usersService.updateService(req.user.id, Number(id));
  }

  @ApiResponse({ type: [ServiceResponse] })
  @Delete('services')
  async removeService(@Request() req) {
    return await this.usersService.removeService(req.user.id);
  }
}
