import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Assignment } from '../../assignment/entities/assignment.entity';
import { Employee } from '../../employee/entities/employee.entity';
import { Shift } from '../../shift/entities/shift.entity';

@Entity({
  name: 'schedules',
})
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'schedule_code',
    type: 'varchar',
    length: 20,
    nullable: false,
    unique: true,
  })
  scheduleCode: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  name: string;

  // Связь: один график — много сотрудников
  @OneToMany(() => Employee, (employee) => employee.homeSchedule)
  employees: Employee[];

  // Связь: один график — много назначений
  @OneToMany(() => Assignment, (assignment) => assignment.currentSchedule)
  assignments: Assignment[];

  // Связь: один график — много смен
  @OneToMany(() => Shift, (shift) => shift.schedule)
  shifts: Shift[];
}
