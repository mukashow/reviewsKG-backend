import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.model';
import { Service } from '../services/service.model';
import { AuthModule } from '../auth/auth.module';
import { UserService } from './user-service.model';
import { ServicesModule } from '../services/service.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    ServicesModule,
    SequelizeModule.forFeature([User, Service, UserService]),
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
