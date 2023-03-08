import { forwardRef, Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { ServicesService } from './service.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Service } from './service.model';
import { AuthModule } from '../auth/auth.module';
// import { Review } from '../reviews/reviews.model';
// import { ReviewService } from '../reviews/review-service.model';
// import { User } from '../users/users.model';
// import { UserService } from '../users/user-service.model';

@Module({
  controllers: [ServiceController],
  providers: [ServicesService],
  imports: [
    SequelizeModule.forFeature([
      Service,
      // Review,
      // ReviewService,
      // User,
      // UserService,
    ]),
    forwardRef(() => AuthModule),
  ],
  exports: [ServicesService],
})
export class ServicesModule {}
