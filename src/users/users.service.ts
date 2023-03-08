import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { Service } from '../services/service.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private repository: typeof User,
    @InjectModel(Service) private serviceRepository: typeof Service
  ) {}

  async getUserByPhone(phone: string) {
    return this.repository.findOne({
      where: { phone },
    });
  }

  async create(phone: string) {
    return await this.repository.create({ phone });
  }

  async getServices(id: number) {
    return (
      (
        await this.repository.findByPk(id, {
          include: { model: Service, through: { attributes: [] } },
        })
      )?.services || []
    );
  }

  async addService(userId: number, serviceId: number) {
    const service = await this.serviceRepository.findByPk(serviceId);
    if (!service) {
      throw new HttpException('No such service', HttpStatus.NOT_FOUND);
    }

    const user = await this.repository.findByPk(userId, {
      include: { model: Service, through: { attributes: [] } },
      plain: true,
    });
    if (user.services.some(({ id }) => id === serviceId)) {
      throw new HttpException(
        'This service already have added',
        HttpStatus.BAD_REQUEST
      );
    }

    await user.$add('services', service);
    return await this.serviceRepository.findByPk(serviceId);
  }

  async removeService(userId: number, serviceId: number) {
    const service = await this.serviceRepository.findByPk(serviceId);
    if (!service) {
      throw new HttpException('No such service', HttpStatus.NOT_FOUND);
    }

    const user = await this.repository.findByPk(userId, {
      include: { model: Service, through: { attributes: [] } },
      plain: true,
    });
    if (!user.services.some(({ id }) => id === serviceId)) {
      throw new HttpException(
        "This user doesn't have such service",
        HttpStatus.NOT_FOUND
      );
    }

    await user.$remove('services', service);
    return await this.getServices(userId);
  }
}
