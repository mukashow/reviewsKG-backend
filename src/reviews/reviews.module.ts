import { forwardRef, Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Review } from './reviews.model';
import { ReviewService } from './review-service.model';
import { Service } from '../services/service.model';
import { ServicesModule } from '../services/service.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [ReviewsService],
  controllers: [ReviewsController],
  imports: [
    ServicesModule,
    SequelizeModule.forFeature([Service, Review, ReviewService]),
    forwardRef(() => AuthModule),
  ],
})
export class ReviewsModule {}
