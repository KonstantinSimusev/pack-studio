import { ConflictException, Injectable } from '@nestjs/common';

import { hasManager } from '../../shared/utils/utils';
import { EAttendanceCode } from '../../shared/enums/enums';
import { IAddSuccess, ISuccess } from '../../shared/interfaces/api.interface';

import { CreateEmployeeShiftDto } from './dto/create-employee-shift.dto';
import { UpdateEmployeeShiftDto } from './dto/update-employee-shift.dto';

import { EmployeeShiftRepository } from '../employee-shift/employee-shift.repository';

import { AttendanceTypeService } from '../attendance-type/attendance-type.service';
import { EmployeeService } from '../employee/employee.service';
import { EmployeeShiftService } from '../employee-shift/employee-shift.service';
import { ProfessionService } from '../profession/profession.service';
import { ShiftService } from '../shift/shift.service';
import { WorkplaceService } from '../work-place/work-place.service';

@Injectable()
export class EmployeeShiftManagementService {
  constructor(
    private readonly employeeShiftRepository: EmployeeShiftRepository,
    private readonly attendanceTypeService: AttendanceTypeService,
    private readonly employeeService: EmployeeService,
    private readonly professionService: ProfessionService,
    private readonly employeeShiftService: EmployeeShiftService,
    private readonly shiftService: ShiftService,
    private readonly workplaceService: WorkplaceService,
  ) {}

  async createByPersonalNumber(
    dto: CreateEmployeeShiftDto,
  ): Promise<IAddSuccess> {
    // Получаем сущности
    const [shift, employee] = await Promise.all([
      this.shiftService.getEntityById(dto.shiftId),
      this.employeeService.getEmployeeByPersonalNumberForAdd(
        dto.personalNumber,
      ),
    ]);

    // Проверяем на уже добавленного сотрудника
    await this.employeeShiftService.existsByShiftAndEmployee(
      shift.id,
      employee.id,
    );

    // Проверяем должность руководителя
    if (hasManager(employee.homeProfession.professionCode)) {
      throw new ConflictException('Нельзя добавить руководителя');
    }

    // Получаем сущности
    const [shiftProfession, attendanceType] = await Promise.all([
      this.professionService.getProfessionByCode(
        employee.homeProfession.professionCode,
      ),
      this.attendanceTypeService.getAttendanceByCode(EAttendanceCode.Y),
    ]);

    const employeeShift = await this.employeeShiftRepository.create({
      employee,
      shift,
      shiftProfession,
      attendanceType,
    });

    return {
      message: 'Смена работника создана успешно',
      employeeShiftId: employeeShift.id,
    };
  }

  async updateEmployeeShift(dto: UpdateEmployeeShiftDto): Promise<ISuccess> {
    // Получаем сущности
    const [employeeShift, shiftProfessionCode, attendanceType] =
      await Promise.all([
        this.employeeShiftService.getEmployeeShiftById(dto.id),
        this.professionService.getProfessionByCode(dto.shiftProfessionCode),
        this.attendanceTypeService.getAttendanceByCode(dto.attendanceCode),
      ]);

    // Валидация полей смены сотрудника
    if (
      (attendanceType.attendanceCode === EAttendanceCode.Y &&
        dto.workplaceName === null) ||
      (attendanceType.attendanceCode !== EAttendanceCode.Y &&
        dto.workplaceName !== null)
    ) {
      throw new ConflictException('Измените статус или место');
    }

    // Обновляем поля смены сотрудника
    employeeShift.isReady = true;

    // Обновляем связи смены сотрудника
    employeeShift.shiftProfession = shiftProfessionCode;
    employeeShift.attendanceType = attendanceType;

    if (dto.workplaceName) {
      // Если рабочее место есть — ищем. Если не найдётся, тут вылетит NotFoundException (как и задумано)
      employeeShift.workplace = await this.workplaceService.getWorkplace(
        dto.workplaceName,
        employeeShift.shift.workshop.workshopCode,
        dto.shiftProfessionCode,
      );
    } else {
      employeeShift.workplace = null;
    }

    // Сохранение изменений
    await this.employeeShiftRepository.save(employeeShift);

    return {
      message: 'Смена сотрудника обновлена успешно',
    };
  }
}
