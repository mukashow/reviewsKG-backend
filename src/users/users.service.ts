import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private repository: typeof User) {}

  async getUserByPhone(phone: string) {
    return this.repository.findOne({
      where: { phone },
    });
  }

  async create(phone: string) {
    return await this.repository.create({ phone });
  }

  // async getServices() {
  //   return await this.services.
  // }
}
