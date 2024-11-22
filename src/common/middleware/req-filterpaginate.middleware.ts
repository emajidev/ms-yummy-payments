import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { FilterQuery, SortOrder } from 'mongoose';

interface IFilterRequest extends Request {
  query: {
    filter: string | undefined;
    sort: any | undefined;
    page: string | undefined;
    limit: string | undefined;
    fields: string | undefined;
  };
}

type FilterPaginationQueryOptions = {
  mongoQuery: FilterQuery<any>;
  sort: any;
  page: number;
  limit: number;
  fields: string;
};

export interface FilterValidation {
  allowlist?: RegExp[];
  denylist?: RegExp[];
}
export type sorOrder =
  | { [key: string]: SortOrder | { $meta: 'textScore' } }
  | string;
export class FilterPaginationQuery {
  mongoQuery: FilterQuery<any>;
  sort: sorOrder;
  page: number;
  limit: number;
  fields: string;

  constructor(filter: FilterPaginationQueryOptions) {
    this.mongoQuery = filter.mongoQuery;
    this.sort = this.parseSort(filter.sort);
    this.page = filter.page;
    this.limit = filter.limit;
    this.fields = filter.fields;
  }

  get skip(): number {
    return (this.page - 1) * this.limit;
  }

  private parseSort(sort): sorOrder {
    const sortAsJSON =
      typeof sort === 'string' ? this.parseSortToJSON(sort) : sort;
    const sortParsed = {};

    for (const key of Object.keys(sortAsJSON)) {
      const oldValue = sortAsJSON[key];

      if (![-1, 1, '-1', '1'].includes(sortAsJSON[key])) {
        throw new SyntaxError('Unexpected sort value: ' + oldValue);
      }

      sortParsed[key] = parseInt(oldValue);
    }

    return sortParsed;
  }

  private parseSortToJSON(sort) {
    if (!Object.keys(sort).length) {
      return sort;
    }

    try {
      return JSON.parse(sort);
    } catch (error) {
      throw new Error('Couldn`t parse sort to JSON');
    }
  }
}

@Injectable()
export class FilterPaginateMiddleware implements NestMiddleware {
  use(req: IFilterRequest, res: Response, next: NextFunction) {
    try {
      res.locals.filterPaginationQuery = new FilterPaginationQuery({
        mongoQuery: {},
        sort: req.query.sort || {},
        page: req.query.page ? Math.max(1, parseInt(req.query.page)) : 1,
        limit: req.query.limit ? parseInt(req.query.limit) : 10,
        fields: req.query.fields ? req.query.fields : '',
      });

      return next();
    } catch (e) {
      throw new BadRequestException({
        message: 'Incorrect filter syntax',
        error: e.message,
      });
    }
  }
}