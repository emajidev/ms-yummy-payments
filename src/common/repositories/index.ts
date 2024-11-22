import configuration from '../../config/configuration';
import { DynamicModule } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';

export function isMongoSelected() {
  return configuration.databases.default === 'mongo';
}

/**
 * If the app is configured to use mongo as the database, make the required imports.
 * @param definitions - The model definitions for mongoose
 * @returns {DynamicModule[]} - The modules required for mongoose to work correctly or an empty array if mongo is not the selected database
 */
export function makeImports(definitions: ModelDefinition[]): DynamicModule[] {
  return [
    MongooseModule.forRoot(configuration.databases.mongo.uri),
    MongooseModule.forFeature(definitions),
  ];
}

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
export interface IRepository {}
