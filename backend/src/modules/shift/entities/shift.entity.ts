import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { EmployeeShift } from '../../employee-shift/entities/employee-shift.entity';
import { Report } from '../../report/entities/report.entity';
import { Schedule } from '../../schedule/entities/schedule.entity';
import { Team } from '../../team/entities/team.entity';
import { Workshop } from '../../workshop/entities/workshop.entity';

@Entity({
  name: 'shifts',
})
export class Shift {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'date',
    type: 'date',
    nullable: false,
  })
  date: Date;

  // Тип смены: 1 — дневная, 2 — ночная
  @Column({
    name: 'shift_code',
    type: 'integer',
    nullable: false,
  })
  shiftCode: number;

  // Связь: много смен — один цех
  @ManyToOne(() => Workshop, (workshop) => workshop.shifts)
  @JoinColumn({ name: 'workshop_id' })
  workshop: Workshop;

  // Связь: много смен — одна бригада
  @ManyToOne(() => Team, (team) => team.shifts)
  @JoinColumn({ name: 'team_id' })
  team: Team;

  // Связь: много расписаний смен - один график
  @ManyToOne(() => Schedule, (schedule) => schedule.shifts)
  @JoinColumn({ name: 'schedule_id' })
  schedule: Schedule;

  // Связь: одна смена — много смен сотрудника
  @OneToMany(() => EmployeeShift, (employeeShift) => employeeShift.shift)
  employeeShifts: EmployeeShift[];

  // Связь: одна смена — много рапортов
  @OneToMany(() => Report, (report) => report.shift)
  reports: Report[];
}
