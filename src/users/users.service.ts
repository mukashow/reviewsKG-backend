import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Service } from '../services/services.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repository: Repository<User>,
    @InjectRepository(Service) private serviceRepository: Repository<Service>
  ) {}

  async getUserByPhone(phone: string) {
    return await this.repository.findOneByOrFail({ phone });
  }

  async create(phone: string) {
    const user = this.repository.create({ phone });
    return await this.repository.save(user);
  }

  async updateService(userId: number, serviceId: number) {
    const service = await this.serviceRepository.findOneBy({ id: serviceId });
    if (!service) {
      throw new HttpException('No such service', HttpStatus.NOT_FOUND);
    }

    await this.repository.update(userId, service);
    return await this.repository.findOneBy({ id: userId });
  }

  async removeService(userId: number) {
    const user = await this.repository.findOneBy({ id: userId });
    user.service = null;
    return await this.repository.save(user);
  }
}
