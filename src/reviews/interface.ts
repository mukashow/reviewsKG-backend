import { Review } from './reviews.entity';

export interface FindReviewRes {
  hasMore: boolean;
  result: Review[];
  page: number;
}
