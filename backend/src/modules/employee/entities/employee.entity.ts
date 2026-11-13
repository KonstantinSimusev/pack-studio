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
// import { EmployeeShift } from '../../employee-shift/entities/employee-shift.entity';
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

  // Связь: один сотрудник — один аккаунт
  @OneToOne(() => Account, (account) => account.employee, {
    onDelete: 'CASCADE', // при удалении сотрудника - связанный аккаунт удаляется тоже
  })
  @JoinColumn({ name: 'account_id' })
  account: Account;

  // Связь: один сотрудник — одно назначений
  @OneToOne(() => Assignment, (assignment) => assignment.employee, {
    onDelete: 'CASCADE', // при удалении сотрудника - связанное назаначение удаляется тоже
  })
  @JoinColumn({ name: 'assignment_id' })
  assignment: Assignment;

  // Связь: много много сотрудников — один цех
  @ManyToOne(() => Workshop, (workshop) => workshop.employees)
  @JoinColumn({ name: 'home_workshop_id' })
  homeWorkshop: Workshop;

  // Связь: много сотрудников — одна бригада
  @ManyToOne(() => Team, (team) => team.employees)
  @JoinColumn({ name: 'home_team_id' })
  homeTeam: Team;

  // Связь: много сотрудников — одна профессия
  @ManyToOne(() => Profession, (profession) => profession.employees)
  @JoinColumn({ name: 'home_profession_id' })
  homeProfession: Profession;

  // Связь: много сотрудников — один график
  @ManyToOne(() => Schedule, (schedule) => schedule.employees)
  @JoinColumn({ name: 'home_schedule_id' })
  homeSchedule: Schedule;

  // // Связь: один сотрудник — много смен сотрудника
  // @OneToMany(() => EmployeeShift, (employeeShift) => employeeShift.employee)
  // employeeShifts: EmployeeShift[];
}
