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
import { ApiKeyGuard, JwtAuthGuard } from '../auth/jwt-auth-guard';
import { ServiceResponse } from './dto/service-response';
import { ServiceCRUDQuery } from './dto/service-crud-query';
import { AddServiceToParent } from './dto/addServiceToParent';

@ApiTags('Услуги')
@Controller('services')
export class ServicesController {
  constructor(private service: ServicesService) {}

  @UseGuards(ApiKeyGuard)
  @Get()
  async getAll() {
    return this.service.get();
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: ServiceResponse })
  @Post()
  async create(@Body() dto: ServiceCreate) {
    return this.service.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: ServiceResponse })
  @Post(':parent/add/:id')
  async addServiceToParent(@Param() { parent, id }: AddServiceToParent) {
    return this.service.addServiceToParent({
      id: Number(id),
      parent: Number(parent),
    });
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: [ServiceResponse] })
  @Delete(':id/delete')
  async delete(@Param() { id }: ServiceCRUDQuery) {
    return this.service.delete(+id);
  }
}
