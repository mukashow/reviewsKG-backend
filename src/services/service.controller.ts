import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ServicesService } from './service.service';
import { ServiceCreate } from './dto/create';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { ServiceResponse } from './dto/service-response';
import { ServiceCRUDQuery } from './dto/service-crud-query';

@ApiTags('Услуги')
// @UseGuards(JwtAuthGuard)
@Controller('services')
export class ServiceController {
  constructor(private service: ServicesService) {}

  @Get()
  async getAll() {
    return this.service.get();
  }

  @ApiResponse({ type: ServiceResponse })
  @Post()
  async create(@Body() dto: ServiceCreate) {
    return this.service.create(dto);
  }

  @ApiResponse({ type: [ServiceResponse] })
  @Delete(':id')
  async delete(@Param() { id }: ServiceCRUDQuery) {
    return this.service.delete(id);
  }
}
