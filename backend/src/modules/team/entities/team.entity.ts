import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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
  @OneToMany(() => Employee, (employee) => employee.team)
  employees: Employee[];

  // Связь: одна бригада — много сотрудников (profile бригада)
  @OneToMany(() => Employee, (employee) => employee.profileTeam)
  profileEmployees: Employee[];

  // // Связь: одна бригада — много смен
  // @OneToMany(() => Shift, (shift) => shift.team)
  // shifts: Shift[];
}
