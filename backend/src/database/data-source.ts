import * as path from 'node:path';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Загружаем ../.env в process.env для локального запуска CLI.
// В Docker файла нет — вызов молча ничего не сделает:
// переменные уже приходят из compose
ConfigModule.forRoot({
  envFilePath: path.resolve(process.cwd(), '../.env'),
});

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  schema: configService.get<string>('DB_SCHEMA'),
  entities: [__dirname + '/../modules/**/*.entity.{js,ts}'],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  uuidExtension: 'pgcrypto',
  synchronize: false,
});
