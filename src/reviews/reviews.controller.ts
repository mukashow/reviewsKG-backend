import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewCreate } from './dto/create';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { ReviewQuery } from './dto/review-query';
import { ReviewCrudQuery } from './dto/review-crud-query';

@ApiTags('Отзывы')
// @UseGuards(JwtAuthGuard)
@Controller('reviews')
export class ReviewsController {
  constructor(private service: ReviewsService) {}

  @Post()
  @ApiResponse({ type: ReviewCreate })
  async create(@Body() dto: ReviewCreate) {
    return await this.service.create(dto);
  }

  @Delete(':id')
  async delete(@Request() req, @Param() { id }: ReviewCrudQuery) {
    return await this.service.delete(id, req.user.phone);
  }

  @Get(':phone')
  @ApiResponse({ type: ReviewCreate })
  async get(@Param() { phone }: ReviewQuery) {
    return await this.service.get(phone);
  }
}
