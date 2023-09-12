import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewCreate } from './dto/create';
import { Review } from './reviews.entity';
import { Service } from '../services/services.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private repository: Repository<Review>,
    @InjectRepository(Service) private serviceRepository: Repository<Service>
  ) {}

  async create({ service: serviceId, ...createDto }: ReviewCreate) {
    // if (serviceId) {
    //   const service = await this.serviceRepository.findByPk(serviceId, {
    //     plain: true,
    //   });
    //
    //   if (!service) {
    //     throw new HttpException(
    //       'Service does not exists',
    //       HttpStatus.NOT_FOUND
    //     );
    //   }
    // }
    // const review = await this.repository.create({ ...createDto, serviceId });
    // return await this.repository.findByPk(review.id, {
    //   include: [Service],
    // });
    return;
  }

  async delete(id: number, author: string) {
    // const isReviewExists = await this.repository.findOne({
    //   where: { id, author },
    // });
    //
    // if (!isReviewExists) {
    //   throw new HttpException(
    //     'This user does not have such review',
    //     HttpStatus.NOT_FOUND
    //   );
    // }
    //
    // await this.repository.destroy({ where: { id } });
    return;
  }

  async get(serviceProviderPhone: string) {
    // return await this.repository.findAll({
    //   where: { serviceProviderPhone },
    //   include: [Service],
    // });
    return;
  }
}
