import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Assignment } from '../../assignment/entities/assignment.entity';
import { Employee } from '../../employee/entities/employee.entity';
// import { Workplace } from '../../work-place/entities/work-place.entity';

@Entity({
  name: 'professions',
})
export class Profession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'profession_code',
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  professionCode: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  name: string;

  // Связь: одна профессия — много сотрудников
  @OneToMany(() => Employee, (employee) => employee.homeProfession)
  employees: Employee[];

  // Связь: одна профессия — много назначений
  @OneToMany(() => Assignment, (assignment) => assignment.currentProfession)
  assignments: Assignment[];

  // // Связь: одна профессия — много рабочих мест
  // @OneToMany(() => Workplace, (workplace) => workplace.profession)
  // workplaces: Workplace[];
}
