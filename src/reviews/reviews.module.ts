import { forwardRef, Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Review } from './reviews.entity';
import { Service } from '../services/services.entity';

@Module({
  providers: [ReviewsService],
  controllers: [ReviewsController],
  imports: [
    TypeOrmModule.forFeature([Review, Service]),
    forwardRef(() => AuthModule),
  ],
})
export class ReviewsModule {}
