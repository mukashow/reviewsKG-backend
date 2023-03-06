import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ServicesService } from './service.service';
import { ServiceCreate } from './dto/create';

@ApiTags('Услуги')
@Controller('services')
export class ServiceController {
  constructor(private service: ServicesService) {}

  @Get('services/:page')
  async getAll() {
    return this.service.get();
  }

  @Post()
  async create(@Body() dto: ServiceCreate) {
    console.log(dto);
    return this.service.create(dto);
  }
}
