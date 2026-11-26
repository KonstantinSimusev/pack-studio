import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

import { Account } from '../../account/entities/account.entity';
import { Assignment } from '../../assignment/entities/assignment.entity';
import { EmployeeProduct } from '../../employee-product/entities/employee-product.entity';
import { EmployeeShift } from '../../employee-shift/entities/employee-shift.entity';
import { Profession } from '../../profession/entities/profession.entity';
import { Schedule } from '../../schedule/entities/schedule.entity';
import { Team } from '../../team/entities/team.entity';
import { Workshop } from '../../workshop/entities/workshop.entity';

@Entity({
  name: 'employees',
})
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  lastName: string;

  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  firstName: string;

  @Column({
    name: 'patronymic',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  patronymic: string;

  @Column({
    name: 'personal_number',
    type: 'integer',
    nullable: false,
    unique: true,
  })
  personalNumber: number;

  // Связь: один сотрудник — один аккаунт (FK живёт в accounts)
  @OneToOne(() => Account, (account) => account.employee)
  account: Account;

  // Связь: один сотрудник — одно назначение (FK живёт в assignments)
  @OneToOne(() => Assignment, (assignment) => assignment.employee)
  assignment: Assignment;

  // Связь: много много сотрудников — один цех
  @ManyToOne(() => Workshop, (workshop) => workshop.employees, {
    nullable: false,
  })
  @JoinColumn({ name: 'home_workshop_id' })
  homeWorkshop: Workshop;

  // Связь: много сотрудников — одна бригада
  @ManyToOne(() => Team, (team) => team.employees, { nullable: false })
  @JoinColumn({ name: 'home_team_id' })
  homeTeam: Team;

  // Связь: много сотрудников — одна профессия
  @ManyToOne(() => Profession, (profession) => profession.employees, {
    nullable: false,
  })
  @JoinColumn({ name: 'home_profession_id' })
  homeProfession: Profession;

  // Связь: много сотрудников — один график
  @ManyToOne(() => Schedule, (schedule) => schedule.employees, {
    nullable: false,
  })
  @JoinColumn({ name: 'home_schedule_id' })
  homeSchedule: Schedule;

  // Связь: один сотрудник — много смен сотрудника
  @OneToMany(() => EmployeeShift, (employeeShift) => employeeShift.employee)
  employeeShifts: EmployeeShift[];

  // Связь: один сотрудник — много записей продукции
  @OneToMany(
    () => EmployeeProduct,
    (employeeProduct) => employeeProduct.employee,
  )
  employeeProducts: EmployeeProduct[];
}
