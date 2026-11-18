import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReportArea } from './entities/report-area.entity';
import { ReportAreaRepository } from './report-area.repository';
import { ReportAreaService } from './report-area.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReportArea])],
  controllers: [],
  providers: [ReportAreaRepository, ReportAreaService],
  exports: [ReportAreaRepository],
})
export class ReportAreaModule {}
