import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Employee } from '../../employee/entities/employee.entity';
// import { EmployeeShift } from '../../employee-shift/entities/employee-shift.entity';
import { Profession } from '../../profession/entities/profession.entity';
import { Schedule } from '../../schedule/entities/schedule.entity';
import { Workshop } from '../../workshop/entities/workshop.entity';
import { Role } from '../../role/entities/role.entity';

@Entity({
  name: 'positions',
})
export class Position {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'position_code',
    type: 'integer',
    nullable: false,
    unique: true,
  })
  positionCode: number;

  // Связь: много позиций — один цех
  @ManyToOne(() => Workshop, (workshop) => workshop.positions)
  @JoinColumn({ name: 'workshop_id' })
  workshop: Workshop;

  // Связь: много позиций — одна профессия
  @ManyToOne(() => Profession, (profession) => profession.positions)
  @JoinColumn({ name: 'profession_id' })
  profession: Profession;

  // Связь: много позиций — один график
  @ManyToOne(() => Schedule, (schedule) => schedule.positions)
  @JoinColumn({ name: 'schedule_id' })
  schedule: Schedule;

  // Связь: много позиций — одна роль
  @ManyToOne(() => Role, (role) => role.positions)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  // Связь: одна позиция — много сотрудников
  @OneToMany(() => Employee, (employee) => employee.position)
  employees: Employee[];

  // Связь: одна позиция — много сотрудников (profile позиция)
  @OneToMany(() => Employee, (employee) => employee.profilePosition)
  profileEmployees: Employee[];

  // // Связь: одна позиция — много смен сотрудников (profile позиция)
  // @OneToMany(
  //   () => EmployeeShift,
  //   (employeeShift) => employeeShift.currentPosition,
  // )
  // employeeShifts: Employee[];
}
