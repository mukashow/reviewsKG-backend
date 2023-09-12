import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceCreate } from './dto/create';
import { Service } from './services.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service) private repository: Repository<Service>
  ) {}

  async get() {
    return this.repository.find();
  }

  async create(dto: ServiceCreate) {
    // const candidate = await this.repository.findOne({
    //   where: { title: dto.title },
    // });
    //
    // if (candidate) {
    //   throw new HttpException(
    //     'There is already exists service with this title',
    //     HttpStatus.BAD_REQUEST
    //   );
    // }
    // return await this.repository.create(dto);
    const service = this.repository.create(dto);
    return await this.repository.save(service);
  }

  async delete(id: number) {
    // const service = await this.repository.findByPk(id);
    // if (!service) {
    //   throw new HttpException('No such service', HttpStatus.NOT_FOUND);
    // }
    //
    // await this.repository.destroy({ where: { id } });
    // return await this.get();
    return;
  }
}
