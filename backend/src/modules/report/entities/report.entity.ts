import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ReportArea } from '../../report-area/entities/report-area.entity';
import { ReportType } from '../../report-type/entities/report-type.entity';
import { Shift } from '../../shift/entities/shift.entity';

@Entity({
  name: 'reports',
})
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'count',
    type: 'integer',
    nullable: false,
    default: 0,
  })
  count: number;

  // Связь: много рапортов — один участок
  @ManyToOne(() => ReportArea, (reportArea) => reportArea.reports, {
    nullable: false,
  })
  @JoinColumn({ name: 'report_area_id' })
  reportArea: ReportArea;

  // Связь: много репортов — одна смена
  @ManyToOne(() => Shift, (shift) => shift.reports, {
    nullable: false,
    onDelete: 'CASCADE', // при удалении смены - удаляться все рапорта этой смены
  })
  @JoinColumn({ name: 'shift_id' })
  shift: Shift;
}
