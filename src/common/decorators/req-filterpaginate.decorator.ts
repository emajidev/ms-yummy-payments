import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FilterValidation } from '../middleware/req-filterpaginate.middleware';

export const FilterPaginate = createParamDecorator(
  (data: FilterValidation = null, ctx: ExecutionContext) => {
    const res = ctx.switchToHttp().getResponse();

    return res.locals.filterPaginationQuery;
  },
);
