import { DataSource } from 'typeorm';

import { ReportArea } from '../../modules/report-area/entities/report-area.entity';
import { ReportType } from '../../modules/report-type/entities/report-type.entity';
import { Workshop } from '../../modules/workshop/entities/workshop.entity';
import { reportAreas } from '../data/report-areas.data';

export const seedReportAreas = async (ds: DataSource): Promise<void> => {
  const repo = ds.getRepository(ReportArea);
  const workshopRepo = ds.getRepository(Workshop);
  const reportTypeRepo = ds.getRepository(ReportType);

  for (const area of reportAreas) {
    const workshop = await workshopRepo.findOne({
      where: { workshopCode: area.workshopCode },
    });

    const reportType = await reportTypeRepo.findOne({
      where: { typeCode: area.reportTypeCode },
    });

    if (!workshop || !reportType) continue;

    const exists = await repo.findOne({
      where: {
        areaCode: area.areaCode,
        workshop: { id: workshop.id },
        reportType: { id: reportType.id },
      },
    });

    if (exists) continue;

    await repo.save({
      areaCode: area.areaCode,
      shortName: area.shortName,
      name: area.name,
      workshop,
      reportType,
    });
  }

  console.log(`Участки созданы: ${reportAreas.length} записей`);
};
