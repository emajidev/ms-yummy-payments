import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionsDto } from './dto/create-transactions.dto';
import { RequestInterceptor } from '@app/common/interceptor/request.interceptor';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '@app/common/decorators/roles.decorator';
import { ERoles } from '@app/common/enums/roles';
import { RolesGuard } from '@app/common/guard/roles.guard';
import { Auth } from '@app/common/decorators/auth.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Transactions')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@UseInterceptors(RequestInterceptor)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post(':collectorId')
  @Roles(ERoles.Payer)
  create(
    @Param('collectorId') collectorId: string,
    @Body() createUserDto: CreateTransactionsDto,
  ) {
    return this.transactionsService.create(collectorId, createUserDto);
  }

  @Roles(ERoles.Collector)
  @Post('authorize')
  authorizePayment(@Body() { id, otp }) {
    return this.transactionsService.authorizePayment(id, otp);
  }

  @Get()
  findAllByUser() {
    return this.transactionsService.findAllByUser();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.transactionsService.findById(id);
  }
}
