import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ActionType } from '../../action-type/entities/action-type.entity';
import { Employee } from '../../employee/entities/employee.entity';
import { EmployeeShift } from '../../employee-shift/entities/employee-shift.entity';

@Entity({
  name: 'employee_products',
})
export class EmployeeProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Номер плавки
  @Column({
    name: 'heat_number',
    type: 'integer',
    nullable: false,
  })
  heatNumber: number;

  // Номер партии
  @Column({
    name: 'party_number',
    type: 'integer',
    nullable: false,
  })
  partyNumber: number;

  // Номер продукции
  @Column({
    name: 'product_number',
    type: 'integer',
    nullable: false,
  })
  productNumber: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
  })
  createdAt: Date;

  // Связь: много действий — один тип действия
  @ManyToOne(() => ActionType, (actionType) => actionType.employeeProducts, {
    nullable: false,
  })
  @JoinColumn({ name: 'action_type_id' })
  actionType: ActionType;

  // Связь: много записей продукции — одна смена сотрудника
  // Запись относится к результату работы в конкретной смене.
  // Удаление смены сотрудника каскадно удаляет её записи
  @ManyToOne(
    () => EmployeeShift,
    (employeeShift) => employeeShift.employeeProducts,
    { nullable: true, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'employee_shift_id' })
  employeeShift: EmployeeShift | null;

  // Связь: много записей продукции — один сотрудник.
  // Владелец продукта, хранится всегда, даже без смены.
  // Каскад закрывает продукты с employee_shift_id = null
  @ManyToOne(() => Employee, (employee) => employee.employeeProducts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}
