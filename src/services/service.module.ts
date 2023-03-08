import { forwardRef, Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { ServicesService } from './service.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Service } from './service.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ServiceController],
  providers: [ServicesService],
  imports: [
    SequelizeModule.forFeature([Service]),
    forwardRef(() => AuthModule),
  ],
  exports: [ServicesService],
})
export class ServicesModule {}
