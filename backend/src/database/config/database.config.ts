import { DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const buildDatabaseOptions = (
  configService: ConfigService,
): DataSourceOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  schema: configService.get<string>('DB_SCHEMA'),
  entities: [__dirname + '/../../modules/**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../migrations/*.{ts,js}'],
  uuidExtension: 'pgcrypto',
  synchronize: false,
});
