import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewCreate } from './dto/create';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { ReviewQuery } from './dto/review-query';

@ApiTags('Отзывы')
@UseGuards(JwtAuthGuard)
@Controller('reviews')
export class ReviewsController {
  constructor(private service: ReviewsService) {}

  @Post()
  @ApiResponse({ type: ReviewCreate })
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() dto: ReviewCreate) {
    return await this.service.create(dto);
  }

  @Get(':phone')
  @ApiResponse({ type: ReviewCreate })
  async get(@Param() { phone }: ReviewQuery) {
    return await this.service.get(phone);
  }
}
