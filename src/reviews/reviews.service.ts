import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './reviews.entity';
import { Service } from '../services/services.entity';
import { ReviewCreateDto, ReviewQueryDto } from './dto';
import { FindReviewRes } from './interface';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private repository: Repository<Review>,
    @InjectRepository(Service) private serviceRepository: Repository<Service>
  ) {}

  async create(author: string, dto: ReviewCreateDto): Promise<Review> {
    let service = null;
    if (dto.service) {
      service = await this.serviceRepository.findOneBy({ id: dto.service });
      if (!service) {
        throw new HttpException(
          'Service does not exists',
          HttpStatus.NOT_FOUND
        );
      }
    }

    if (author === dto.serviceProviderPhone) {
      throw new HttpException(
        'You cannot leave review to yourself',
        HttpStatus.BAD_REQUEST
      );
    }

    const review = await this.repository.create({
      ...dto,
      author,
      service: service,
    });
    await this.repository.save(review);
    return this.repository.findOne({
      where: { id: review.id },
      relations: { service: true },
    });
  }

  async delete(id: number, author: string): Promise<void> {
    const isAuthor = await this.repository.findOne({
      where: { id, author },
    });

    if (!isAuthor) {
      throw new HttpException(
        'You are not author of this review',
        HttpStatus.BAD_REQUEST
      );
    }

    await this.repository.delete(id);
  }

  async get(
    serviceProviderPhone: string,
    { sort, page, pageSize }: ReviewQueryDto
  ): Promise<FindReviewRes> {
    const sortKey = sort.split('_');

    const [result, total] = await this.repository.findAndCount({
      where: { serviceProviderPhone },
      relations: { service: true },
      order: { [sortKey[0]]: sortKey[1] },
      skip: pageSize * (page - 1),
      take: pageSize,
    });
    return {
      hasMore: Math.ceil(total / pageSize) > page,
      result,
      page,
    };
  }
}
