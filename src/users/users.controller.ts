import {
  Controller,
  Get,
  UseGuards,
  Request,
  Param,
  NotFoundException,
  Put,
  Body,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { ServiceResponse } from '../services/dto/service-response';
import { UserGetResponse } from './dto/user-get-response';
import { UserQuery } from './dto/user-query';
import { ProfileUpdate } from './dto/profile-update';
import { ReviewCreateDto, ReviewQueryDto } from '../reviews/dto';
import { ReviewsService } from '../reviews/reviews.service';
import { FindReviewRes } from '../reviews/interface';

@ApiTags('Пользователи')
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe({ transform: true }))
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private reviewsService: ReviewsService
  ) {}

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
  @Put()
  async updateProfile(@Request() req, @Body() dto: ProfileUpdate) {
    return await this.usersService.updateProfile(req.user.id, dto);
  }

  @Get('reviews')
  @ApiResponse({ type: ReviewCreateDto })
  async getReviews(@Query() query: ReviewQueryDto): Promise<FindReviewRes> {
    return await this.reviewsService.get(query.phone, query);
  }
}
