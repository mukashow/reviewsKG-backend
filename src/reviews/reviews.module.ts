import { forwardRef, Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Review } from './reviews.model';
import { Service } from '../services/service.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [ReviewsService],
  controllers: [ReviewsController],
  imports: [
    SequelizeModule.forFeature([Review, Service]),
    forwardRef(() => AuthModule),
  ],
})
export class ReviewsModule {}
