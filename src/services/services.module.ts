import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { AuthModule } from '../auth/auth.module';
import { Service } from './services.entity';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService],
  imports: [TypeOrmModule.forFeature([Service]), forwardRef(() => AuthModule)],
  exports: [ServicesService],
})
export class ServicesModule {}
