import { DataSource } from 'typeorm';

import { ReportType } from '../../modules/report-type/entities/report-type.entity';
import { reportTypes } from '../data/report-types.data';

export const seedReportTypes = async (ds: DataSource): Promise<void> => {
  const repo = ds.getRepository(ReportType);

  for (const reportType of reportTypes) {
    const exists = await repo.findOne({
      where: { typeCode: reportType.typeCode },
    });

    if (exists) continue;

    await repo.save(reportType);
  }

  console.log(`Типы рапортов созданы: ${reportTypes.length} записей`);
};
