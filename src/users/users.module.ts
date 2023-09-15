import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from '../services/services.entity';
import { ReviewsModule } from '../reviews/reviews.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    ReviewsModule,
    TypeOrmModule.forFeature([User, Service]),
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
