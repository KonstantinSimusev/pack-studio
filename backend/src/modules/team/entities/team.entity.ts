import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Assignment } from '../../assignment/entities/assignment.entity';
import { Employee } from '../../employee/entities/employee.entity';
// import { Shift } from '../../shift/entities/shift.entity';

@Entity({
  name: 'teams',
})
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'team_number',
    type: 'integer',
    nullable: false,
    unique: true,
  })
  teamNumber: number;

  // Связь: одна бригада — много сотрудников
  @OneToMany(() => Employee, (employee) => employee.homeTeam)
  employees: Employee[];

  // Связь: одна бригада — много назначений
  @OneToMany(() => Assignment, (assignment) => assignment.currentTeam)
  assignments: Assignment[];

  // // Связь: одна бригада — много смен
  // @OneToMany(() => Shift, (shift) => shift.team)
  // shifts: Shift[];
}
