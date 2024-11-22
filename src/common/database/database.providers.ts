import * as mongoose from 'mongoose';
import configuration from '../../config/configuration';

export const databaseProviders = [
  {
    provide: 'mongo',
    useFactory: async (): Promise<any> => {
      await mongoose.connect(`${configuration.databases.mongo.uri}`);
    },
  },
];
