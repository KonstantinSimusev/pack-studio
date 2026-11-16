import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { AttendanceType } from '../../attendance-type/entities/attendance-type.entity';
import { Employee } from '../../employee/entities/employee.entity';
import { Profession } from '../../profession/entities/profession.entity';
import { Shift } from '../../shift/entities/shift.entity';
import { Workplace } from '../../work-place/entities/work-place.entity';

@Entity({
  name: 'employee_shifts',
})
export class EmployeeShift {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Связь: много смен сотрудника — один сотрудник
  @ManyToOne(() => Employee, (employee) => employee.employeeShifts, {
    onDelete: 'CASCADE', // при удалении сотрудника — смены работника удаляются тоже
  })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  // Связь: много смен сотрудника — одна смена
  @ManyToOne(() => Shift, (shift) => shift.employeeShifts)
  @JoinColumn({ name: 'shift_id' })
  shift: Shift;

  // Связь: много сотрудников — одна профессия
  @ManyToOne(() => Profession, (profession) => profession.employeeShifts)
  @JoinColumn({ name: 'shift_profession_id' })
  shiftProfession: Profession;

  // Связь: много смен сотрудника — один тип посещаемости
  @ManyToOne(
    () => AttendanceType,
    (attendanceType) => attendanceType.employeeShifts,
  )
  @JoinColumn({ name: 'attendance_type_id' })
  attendanceType: AttendanceType;

  // Связь: много смен сотрудника — одно рабочее место
  @ManyToOne(() => Workplace, (workplace) => workplace.employeeShifts)
  @JoinColumn({ name: 'work_place_id' })
  workplace: Workplace | null;
}
