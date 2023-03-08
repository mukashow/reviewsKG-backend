import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Service } from './service.model';
import { ServiceCreate } from './dto/create';

@Injectable()
export class ServicesService {
  constructor(@InjectModel(Service) private repository: typeof Service) {}

  async get() {
    const getPagingData = (data, page, limit) => {
      const { count: totalItems, rows: tutorials } = data;
      const currentPage = page ? +page : 0;
      const totalPages = Math.ceil(totalItems / limit);

      return { totalItems, tutorials, totalPages, currentPage };
    };
    // const { page, size } = req.query;
    // const { limit, offset } = getPagination(page, size);
    return this.repository.findAll();
  }

  async create(dto: ServiceCreate) {
    return await this.repository.create(dto);
  }

  async delete(id: number) {
    const service = await this.repository.findByPk(id);
    if (!service) {
      throw new HttpException('No such service', HttpStatus.NOT_FOUND);
    }

    await this.repository.destroy({ where: { id } });
    return await this.get();
  }
}
