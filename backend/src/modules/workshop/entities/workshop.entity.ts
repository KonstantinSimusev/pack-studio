import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Assignment } from '../../assignment/entities/assignment.entity';
import { Employee } from '../../employee/entities/employee.entity';

@Entity({
  name: 'workshops',
})
export class Workshop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'workshop_code',
    type: 'varchar',
    length: 20,
    nullable: false,
    unique: true,
  })
  workshopCode: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  name: string;

  // Связь: один цех — много сотрудников
  @OneToMany(() => Employee, (employee) => employee.homeWorkshop)
  employees: Employee[];

  // Связь: один цех — много назначений
  @OneToMany(() => Assignment, (assignment) => assignment.currentWorkshop)
  assignments: Assignment[];
}
