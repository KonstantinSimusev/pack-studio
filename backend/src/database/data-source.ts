import * as path from 'node:path';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { buildDatabaseOptions } from './config/database.config';

// Загружаем ../.env в process.env для локального запуска CLI.
// В Docker файла нет — вызов молча ничего не сделает:
// переменные уже приходят из compose
ConfigModule.forRoot({
  envFilePath: path.resolve(process.cwd(), '../.env'),
});

const configService = new ConfigService();

export const AppDataSource = new DataSource(
  buildDatabaseOptions(configService),
);
