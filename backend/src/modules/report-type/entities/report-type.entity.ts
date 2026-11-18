import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ReportArea } from '../../report-area/entities/report-area.entity';

@Entity({
  name: 'report_types',
})
export class ReportType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'type_code',
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  typeCode: string; // production, shipment, pack, fix, residue

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  name: string; // Производство, Отгрузка, Упаковка, Раскрепление, Остаток

  // Связь: один тип — много участков
  @OneToMany(() => ReportArea, (reportArea) => reportArea.reportType)
  reportAreas: ReportArea[];
}
