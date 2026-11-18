// import { Repository } from 'typeorm';
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';

// import { ReportType } from './entities/report-type.entity';

// @Injectable()
// export class ReportTypeRepository {
//   constructor(
//     @InjectRepository(ReportType)
//     private readonly reportTypeRepository: Repository<ReportType>,
//   ) {}

//   // 2. CRUD: Read (общие методы поиска)
//   // async findAll(): Promise<ReportType[]> {
//   //   return this.reportTypeRepository.find({});
//   // }

//   // async findByCode(typeCode: string): Promise<ReportType | null> {
//   //   return this.reportTypeRepository.findOneBy({ typeCode });
//   // }

// }
