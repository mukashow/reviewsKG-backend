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
import { ServicesService } from './services.service';
import { ServiceCreate } from './dto/create';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { ServiceResponse } from './dto/service-response';
import { ServiceCRUDQuery } from './dto/service-crud-query';

@ApiTags('Услуги')
// @UseGuards(JwtAuthGuard)
@Controller('services')
export class ServicesController {
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
