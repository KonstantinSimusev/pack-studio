import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
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
        migrationsRun: true,
        retryAttempts: 5,
        retryDelay: 1000,
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
