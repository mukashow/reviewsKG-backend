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

  async create({ services, ...createDto }: ReviewCreate) {
    const checkServicePromises = services.map(
      serviceId =>
        new Promise<Service>(async resolve => {
          const service = await this.serviceRepository.findByPk(serviceId, {
            plain: true,
          });
          resolve(service);
        })
    );
    const providedServices = await Promise.all(checkServicePromises);
    const isServiceDoesntExists = providedServices.some(service => !service);

    if (isServiceDoesntExists) {
      throw new HttpException(
        'One of service does not exists',
        HttpStatus.NOT_FOUND
      );
    }

    const review = await this.repository.create(createDto);
    const addServicePromises = providedServices.map(
      service =>
        new Promise<void>(async resolve => {
          await review.$add('services', service);
          resolve();
        })
    );
    await Promise.all(addServicePromises);
    return await this.repository.findByPk(review.id, {
      include: { model: Service, through: { attributes: [] } },
    });
  }

  async get(serviceProviderPhone: string) {
    return await this.repository.findAll({
      where: { serviceProviderPhone },
      include: { model: Service, through: { attributes: [] } },
    });
  }
}
