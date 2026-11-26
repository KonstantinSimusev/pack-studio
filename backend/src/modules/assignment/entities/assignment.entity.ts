import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Profession } from '../../profession/entities/profession.entity';
import { Schedule } from '../../schedule/entities/schedule.entity';
import { Team } from '../../team/entities/team.entity';
import { Workshop } from '../../workshop/entities/workshop.entity';
import { Employee } from '../../employee/entities/employee.entity';

@Entity({
  name: 'assignments',
})
export class Assignment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Доступ в личный кабинет
  @Column({
    name: 'is_active',
    default: true,
    nullable: false,
  })
  isActive: boolean;

  // Связь: много назначений — один цех
  // Это связь нужна для выбора личного кабинета по задачам (бригадир, мастер и тд)
  @ManyToOne(() => Workshop, (workshop) => workshop.assignments, {
    nullable: false,
  })
  @JoinColumn({ name: 'current_workshop_id' })
  currentWorkshop: Workshop;

  // Связь: много назначений — одна бригада
  // Это связь нужна для выбора личного кабинета по задачам (бригадир, мастер и тд)
  @ManyToOne(() => Team, (team) => team.assignments, { nullable: false })
  @JoinColumn({ name: 'current_team_id' })
  currentTeam: Team;

  // Связь: много назначений — одна профессия
  // Это связь нужна для выбора личного кабинета по задачам (бригадир, мастер и тд)
  @ManyToOne(() => Profession, (profession) => profession.assignments, {
    nullable: false,
  })
  @JoinColumn({ name: 'current_profession_id' })
  currentProfession: Profession;

  // Связь: много назначений — один график
  // Это связь нужна для выбора личного кабинета по задачам (бригадир, мастер и тд)
  @ManyToOne(() => Schedule, (schedule) => schedule.assignments, {
    nullable: false,
  })
  @JoinColumn({ name: 'current_schedule_id' })
  currentSchedule: Schedule;

  // Связь: одно назначение — один сотрудник
  // FK: employee_id в таблице assignments
  // Каскад: при удалении сотрудника назначение удаляется вместе с ним
  @OneToOne(() => Employee, (employee) => employee.assignment, {
    nullable: false,
    onDelete: 'CASCADE', // при удалении сотрудника назначение удаляется вместе с ним
  })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}
