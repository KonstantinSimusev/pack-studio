import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReportArea } from './entities/report-area.entity';
import { ReportAreaRepository } from './report-area.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ReportArea])],
  controllers: [],
  providers: [ReportAreaRepository],
  exports: [ReportAreaRepository],
})
export class ReportAreaModule {}
