import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from './reviews.model';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review) private repository: typeof Review) {}
}
