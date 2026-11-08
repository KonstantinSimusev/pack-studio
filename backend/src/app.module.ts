import * as path from 'node:path';

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

// import { GlobalAuthModule } from './global/global-auth.module';

// import { EmployeeAccountModule } from './modules/employee-account/employee-account.module';
// import { EmployeeManagementModule } from './modules/employee-management/employee-management.module';
// import { EmployeeShiftModule } from './modules/employee-shift/employee-shift.module';
// import { NoticeManagementModule } from './modules/notice-management/notice-management.module';
// import { NoticeModule } from './modules/notice/notice.module';
// import { ShiftManagementModule } from './modules/shift-management/shift-management.module';
// import { ShiftModule } from './modules/shift/shift.module';
// import { EmployeeShiftManagementModule } from './modules/employee-shift-management/employee-shift-management.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(process.cwd(), '../.env'),
    }),
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
        synchronize: false,
        retryAttempts: 5,
        retryDelay: 1000,
      }),
    }),
    // GlobalAuthModule,
    // EmployeeAccountModule,
    // EmployeeManagementModule,
    // EmployeeShiftManagementModule,
    // EmployeeShiftModule,
    // NoticeManagementModule,
    // NoticeModule,
    // ShiftManagementModule,
    // ShiftModule,
    ServeStaticModule.forRoot(
      {
        rootPath: path.join(__dirname, '..', 'dist', 'assets'),
      },
      {
        rootPath: path.join(__dirname, 'public'),
        serveStaticOptions: {
          index: false,
        },
      },
    ),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
