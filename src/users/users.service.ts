import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Service } from '../services/services.entity';
import { ProfileUpdate } from './dto/profile-update';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repository: Repository<User>,
    @InjectRepository(Service) private serviceRepository: Repository<Service>
  ) {}

  async getUserByPhone(phone: string): Promise<User> {
    return await this.repository.findOneByOrFail({ phone });
  }

  async queryUserByPhone(phone: string): Promise<User> {
    return await this.repository.findOneBy({ phone });
  }

  async create(phone: string): Promise<User> {
    const user = this.repository.create({ phone });
    return await this.repository.save(user);
  }

  async updateProfile(userId: number, dto: ProfileUpdate): Promise<User> {
    if (Object.keys(dto).length === 0) {
      return await this.repository.findOne({
        where: { id: userId },
        relations: { service: true },
      });
    }

    const user = await this.repository.findOneBy({ id: userId });

    if ('service' in dto) {
      if (dto.service === null) {
        user.service = null;
      } else {
        const foundService = await this.serviceRepository.findOneBy({
          id: dto.service,
        });
        if (!foundService) {
          throw new HttpException(
            `There is no service with ${dto.service} id`,
            HttpStatus.BAD_REQUEST
          );
        }
        user.service = foundService;
      }
    }

    if ('description' in dto) {
      user.description = dto.description;
    }

    await this.repository.save(user);
    return this.repository.findOne({
      where: { id: userId },
      relations: { service: true },
    });
  }
}
