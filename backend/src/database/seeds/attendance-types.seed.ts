import { DataSource } from 'typeorm';

import { AttendanceType } from '../../modules/attendance-type/entities/attendance-type.entity';
import { attendanceTypes } from '../data/attendance-types.data';

export const seedAttendanceTypes = async (ds: DataSource): Promise<void> => {
  const repo = ds.getRepository(AttendanceType);

  for (const attendanceType of attendanceTypes) {
    const exists = await repo.findOne({
      where: { attendanceCode: attendanceType.attendanceCode },
    });
    
    if (exists) continue;

    await repo.save(attendanceType);
  }

  console.log(`Типы посещаемости созданы: ${attendanceTypes.length} записей`);
};
