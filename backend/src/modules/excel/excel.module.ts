import { Module } from '@nestjs/common';

import { ExcelService } from './excel.service';
import { ExcelController } from './excel.controller';

@Module({
  imports: [
    // ShiftModule,
    // ResidueModule
  ],
  controllers: [ExcelController],
  providers: [ExcelService],
  exports: [],
})
export class ExcelModule {}
