import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Report } from '../../report/entities/report.entity';
import { Workshop } from '../../workshop/entities/workshop.entity';
import { ReportType } from '../../report-type/entities/report-type.entity';

@Entity({
  name: 'report_areas',
})
export class ReportArea {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'area_code',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  areaCode: string; // STAN_2000, GD_6, OCH_1, LUR

  @Column({
    name: 'short_name',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  shortName: string; // СТАН, Ж/д, 1 оч., ЛУР — сокращение для интерфейса

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name: string; // СТАН-2000, Ж/д тупик № 6, 1 очередь, ЛУР

  // Связь: много участков — один тип
  @ManyToOne(() => ReportType, (reportType) => reportType.reportAreas, {
    nullable: false,
  })
  @JoinColumn({ name: 'report_type_id' })
  reportType: ReportType;

  // Связь: много участков — один цех
  @ManyToOne(() => Workshop, (workshop) => workshop.areas, { nullable: false })
  @JoinColumn({ name: 'workshop_id' })
  workshop: Workshop;

  // Связь: один участок — много рапортов
  @OneToMany(() => Report, (report) => report.reportArea)
  reports: Report[];
}
