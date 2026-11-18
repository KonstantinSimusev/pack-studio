// import { Injectable, NotFoundException } from '@nestjs/common';

// import { ReportType } from './entities/report-type.entity';
// import { ReportTypeRepository } from './report-type.repository';

// @Injectable()
// export class ReportTypeService {
//   constructor(private readonly reportTypeRepository: ReportTypeRepository) {}

//   // async getAllReportTypes(): Promise<ReportType[]> {
//   //   const reportTypes = await this.reportTypeRepository.findAll();

//   //   if (reportTypes.length === 0) {
//   //     throw new NotFoundException('Типы рапортов не найдены');
//   //   }

//   //   return reportTypes;
//   // }

//   // async getReportTypeByCode(typeCode: string): Promise<ReportType> {
//   //   const reportType = await this.reportTypeRepository.findByCode(typeCode);

//   //   if (!reportType) {
//   //     throw new NotFoundException(`Цех ${typeCode} не найден`);
//   //   }

//   //   return reportType;
//   // }
// }
