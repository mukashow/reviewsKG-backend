import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard, JwtAuthGuard } from '../auth/jwt-auth-guard';
import { Order, ReviewCreateDto, ReviewDeleteDto, ReviewQueryDto } from './dto';
import { Review } from './reviews.entity';
import { FindReviewRes } from './interface';

@ApiTags('Отзывы')
@UsePipes(new ValidationPipe({ transform: true }))
@Controller('reviews')
export class ReviewsController {
  constructor(private service: ReviewsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({ type: ReviewCreateDto })
  async getMy(
    @Request() { user },
    @Query() query: ReviewQueryDto
  ): Promise<FindReviewRes> {
    return await this.service.get(user.phone, query);
  }

  @UseGuards(ApiKeyGuard)
  @Get('orders')
  @ApiResponse({ type: Order, isArray: true })
  async getOrder(): Promise<Order[]> {
    return [
      { key: 'createdAt_desc', id: 1, title: 'Сначала новые' },
      { key: 'createdAt_asc', id: 2, title: 'Сначала старые' },
      { key: 'rating_desc', id: 3, title: 'Сначала лучшие' },
      { key: 'rating_asc', id: 4, title: 'Сначала худшие' },
    ];
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiResponse({ type: ReviewCreateDto })
  async create(@Request() req, @Body() dto: ReviewCreateDto): Promise<Review> {
    return await this.service.create(req.user.phone, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(
    @Request() req,
    @Param() { id }: ReviewDeleteDto
  ): Promise<void> {
    await this.service.delete(id, req.user.phone);
  }
}
