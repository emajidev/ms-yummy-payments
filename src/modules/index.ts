import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { TransactionsModule } from './transactions/transactions.module';
import { UsersModule } from './users/users.module';

export const modules = [
  HealthModule,
  AuthModule,
  UsersModule,
  TransactionsModule,
];
