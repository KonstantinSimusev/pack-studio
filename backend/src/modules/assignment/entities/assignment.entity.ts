import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

  // Связь: много назначений — один сотрудник
  // Это связь нужна для выбора личного кабинета по задачам (бригадир, мастер и тд)
  @ManyToOne(() => Employee, (employee) => employee.assignments)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  // Связь: много назначений — один цех
  // Это связь нужна для выбора личного кабинета по задачам (бригадир, мастер и тд)
  @ManyToOne(() => Workshop, (workshop) => workshop.assignments)
  @JoinColumn({ name: 'current_workshop_id' })
  currentWorkshop: Workshop;

  // Связь: много назначений — одна бригада
  // Это связь нужна для выбора личного кабинета по задачам (бригадир, мастер и тд)
  @ManyToOne(() => Team, (team) => team.assignments)
  @JoinColumn({ name: 'current_team_id' })
  currentTeam: Team;

  // Связь: много назначений — одна профессия
  // Это связь нужна для выбора личного кабинета по задачам (бригадир, мастер и тд)
  @ManyToOne(() => Profession, (profession) => profession.assignments)
  @JoinColumn({ name: 'current_profession_id' })
  currentProfession: Profession;

  // Связь: много назначений — один график
  // Это связь нужна для выбора личного кабинета по задачам (бригадир, мастер и тд)
  @ManyToOne(() => Schedule, (schedule) => schedule.assignments)
  @JoinColumn({ name: 'current_schedule_id' })
  currentSchedule: Schedule;
}
