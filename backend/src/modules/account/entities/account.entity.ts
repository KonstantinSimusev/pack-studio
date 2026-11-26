import {
  Entity,
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

import { Employee } from '../../employee/entities/employee.entity';

@Entity({
  name: 'accounts',
})
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'login',
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  login: string;

  @Column({
    name: 'hashed_password',
    type: 'varchar',
    length: 512,
    nullable: false,
  })
  hashedPassword: string;

  @Column({
    name: 'hashed_refresh_token',
    type: 'varchar',
    length: 512,
    nullable: true,
  })
  hashedRefreshToken: string | null;

  // Связь: один аккаунт — один сотрудник
  // FK: employee_id в таблице accounts
  // Каскад: при удалении сотрудника аккаунт удаляется вместе с ним
  @OneToOne(() => Employee, (employee) => employee.account, {
    nullable: false,
    onDelete: 'CASCADE', // при удалении сотрудника аккаунт удаляется вместе с ним
  })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}
