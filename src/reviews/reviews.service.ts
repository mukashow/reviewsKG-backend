import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from './reviews.model';
import { ReviewCreate } from './dto/create';
import { Service } from '../services/service.model';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review) private repository: typeof Review,
    @InjectModel(Service) private serviceRepository: typeof Service
  ) {}

  async create({ service: serviceId, ...createDto }: ReviewCreate) {
    if (serviceId) {
      const service = await this.serviceRepository.findByPk(serviceId, {
        plain: true,
      });

      if (!service) {
        throw new HttpException(
          'Service does not exists',
          HttpStatus.NOT_FOUND
        );
      }
    }

    const review = await this.repository.create({ ...createDto, serviceId });
    return await this.repository.findByPk(review.id, {
      include: [Service],
    });
  }

  async delete(id: number, author: string) {
    const isReviewExists = await this.repository.findOne({
      where: { id, author },
    });

    if (!isReviewExists) {
      throw new HttpException(
        'This user does not have such review',
        HttpStatus.NOT_FOUND
      );
    }

    await this.repository.destroy({ where: { id } });
  }

  async get(serviceProviderPhone: string) {
    return await this.repository.findAll({
      where: { serviceProviderPhone },
      include: [Service],
    });
  }
}
