import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();

export default {
  port: parseInt(process.env.PORT, 10) || 3000,
  prefix: '/ms-payments/api',
  environment: process.env.NODE_ENV,
  jwtConstants: {
    secret: process.env.JWT_SECRET_KEY,
  },
  databases: {
    mongo: {
      uri: process.env['MONGO_CONNECTION'],
    },

    default: process.env['DB_CONNECTION'],
  },
};
