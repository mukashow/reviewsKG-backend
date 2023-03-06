import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { ServicesService } from './service.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Service } from './service.model';
import { UserService } from '../users/user-service.model';

@Module({
  controllers: [ServiceController],
  providers: [ServicesService],
  imports: [SequelizeModule.forFeature([Service, UserService])],
})
export class ServicesModule {}
