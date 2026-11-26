import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { AttendanceType } from '../../attendance-type/entities/attendance-type.entity';
import { Employee } from '../../employee/entities/employee.entity';
import { EmployeeProduct } from '../../employee-product/entities/employee-product.entity';
import { Profession } from '../../profession/entities/profession.entity';
import { Shift } from '../../shift/entities/shift.entity';
import { Workplace } from '../../work-place/entities/work-place.entity';

@Entity({
  name: 'employee_shifts',
})
export class EmployeeShift {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Отмеченная смена - после обновления
  @Column({
    name: 'is_ready',
    type: 'boolean',
    default: false,
  })
  isReady: boolean;

  // Связь: много смен сотрудника — один сотрудник
  @ManyToOne(() => Employee, (employee) => employee.employeeShifts, {
    nullable: false, // без этого колонка будет nullable
    onDelete: 'CASCADE', // при удалении сотрудника — смены работника удаляются тоже
  })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  // Связь: много смен сотрудника — одна смена
  @ManyToOne(() => Shift, (shift) => shift.employeeShifts, {
    nullable: false,
    onDelete: 'CASCADE', // при удалении смены — все смены работников этой смены удаляются
  })
  @JoinColumn({ name: 'shift_id' })
  shift: Shift;

  // Связь: много сотрудников — одна профессия
  @ManyToOne(() => Profession, (profession) => profession.employeeShifts, {
    nullable: false,
  })
  @JoinColumn({ name: 'shift_profession_id' })
  shiftProfession: Profession;

  // Связь: много смен сотрудника — один тип посещаемости
  @ManyToOne(
    () => AttendanceType,
    (attendanceType) => attendanceType.employeeShifts,
    { nullable: false },
  )
  @JoinColumn({ name: 'attendance_type_id' })
  attendanceType: AttendanceType;

  // Связь: много смен сотрудника — одно рабочее место
  @ManyToOne(() => Workplace, (workplace) => workplace.employeeShifts)
  @JoinColumn({ name: 'work_place_id' })
  workplace: Workplace | null;

  // Связь: одна смена работника — много записей продукции
  // Продукция привязана к результату работы в конкретной смене работника.
  // Удаление смены работника каскадно удаляет её записи
  @OneToMany(
    () => EmployeeProduct,
    (employeeProduct) => employeeProduct.employeeShift,
  )
  employeeProducts: EmployeeProduct[];
}
