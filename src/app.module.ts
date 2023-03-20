import * as path from 'path';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UsersModule } from './users/users.module';
import { User } from './users/users.model';
import { UserService } from './users/user-service.model';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './services/service.module';
import { Service } from './services/service.model';
import { ReviewsModule } from './reviews/reviews.module';
import { Review } from './reviews/reviews.model';
import { ReviewService } from './reviews/review-service.model';
import { PreAuthMiddleware } from './auth/auth.middleware';
import { FirebaseApp } from './auth/firebase.service';

@Module({
  controllers: [],
  providers: [FirebaseApp],
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_HOST),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Service, UserService, Review, ReviewService],
      autoLoadModels: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    UsersModule,
    AuthModule,
    ServicesModule,
    ReviewsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(PreAuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
