import { Module } from '@nestjs/common';

import { ExcelService } from './excel.service';
import { ExcelController } from './excel.controller';
import { ShiftModule } from '../shift/shift.module';

@Module({
  imports: [ShiftModule],
  controllers: [ExcelController],
  providers: [ExcelService],
  exports: [],
})
export class ExcelModule {}
