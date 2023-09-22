import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceCreate } from './dto/create';
import { Service } from './services.entity';
import { IsNull, Repository } from 'typeorm';
import { AddServiceToParent } from './dto/addServiceToParent';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service) private repository: Repository<Service>
  ) {}

  async get() {
    return this.repository.find({
      relations: { children: true, parent: true },
      where: { parent: IsNull() },
    });
  }

  async create(dto: ServiceCreate) {
    const candidate = await this.repository.findOneBy({ title: dto.title });
    if (candidate) {
      throw new HttpException(
        'There is already exists service with this title',
        HttpStatus.BAD_REQUEST
      );
    }

    const service = this.repository.create(dto);
    return await this.repository.save(service);
  }

  async addServiceToParent(dto: AddServiceToParent) {
    const parent = await this.repository.findOne({
      where: { id: dto.parent },
      relations: { children: true },
    });
    if (!parent) {
      throw new HttpException(
        `There is no service with ${dto.parent} id`,
        HttpStatus.BAD_REQUEST
      );
    }
    const child = await this.repository.findOneBy({ id: dto.id });
    if (!child) {
      throw new HttpException(
        `There is no service with ${dto.id} id`,
        HttpStatus.BAD_REQUEST
      );
    }

    parent.children.push(child);
    return await this.repository.save(parent);
  }

  async delete(id: number) {
    const service = await this.repository.findOneBy({ id });
    if (!service) {
      throw new HttpException(
        `There is no service with ${id} id`,
        HttpStatus.BAD_REQUEST
      );
    }

    await this.repository.delete(id);
    return;
  }
}
