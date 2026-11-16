// import { QueryFailedError } from 'typeorm';

import {
  ConflictException,
  Injectable,
  // InternalServerErrorException,
  // NotFoundException,
} from '@nestjs/common';

// import { normalizeScheduleCode } from '../../shared/utils/utils';

// import { EAttendanceCode } from '../../shared/enums/enums';

import { EAttendanceCode } from '../../shared/enums/enums';
import { ISuccess } from '../../shared/interfaces/api.interface';

import { CreateEmployeeShiftDto } from './dto/create-employee-shift.dto';
// import { DeleteEmployeeShiftDto } from './dto/delete-employee-shift.dto';
import { UpdateEmployeeShiftDto } from './dto/update-employee-shift.dto';

// import { AttendanceType } from '../attendance-type/entities/attendance-type.entity';
// import { Employee } from '../employee/entities/employee.entity';
// import { EmployeeShift } from '../employee-shift/entities/employee-shift.entity';
// import { Shift } from '../shift/entities/shift.entity';

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

  async createByPersonalNumber(dto: CreateEmployeeShiftDto): Promise<ISuccess> {
    // Получаем сущности
    const shift = await this.shiftService.getEntityById(dto.shiftId);

    const employee =
      await this.employeeService.getEmployeeByPersonalNumberForAdd(
        dto.personalNumber,
      );

    const shiftProfession = await this.professionService.getProfessionByCode(
      employee.homeProfession.professionCode,
    );

    const attendanceType = await this.attendanceTypeService.getAttendanceByCode(
      EAttendanceCode.Y,
    );

    // Проверяем на уже добавленного сотрудника
    await this.employeeShiftService.existsByShiftAndEmployee(
      shift.id,
      employee.id,
    );

    await this.employeeShiftRepository.create({
      employee,
      shift,
      shiftProfession,
      attendanceType,
    });

    return {
      message: 'Смена работника создана успешно',
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

  //   private validateShiftConsistency(
  //     employeeShift: EmployeeShift,
  //     dto: UpdateEmployeeShiftDto,
  //   ): void {
  //     const isHoliday = employeeShift.shift.shiftSchedule === null;

  //     if (isHoliday) {
  //       this.validateHolidayShift(employeeShift, dto);
  //       return;
  //     }

  //     this.validateWorkShift(employeeShift, dto);
  //   }

  //   private validateHolidayShift(
  //     employeeShift: EmployeeShift,
  //     dto: UpdateEmployeeShiftDto,
  //   ): void {
  //     // График 5-Б-1
  //     const isSpecialSchedule =
  //       employeeShift.shift.schedule.scheduleCode === ESchedule.S_5B1;

  //     if (isSpecialSchedule) {
  //       this.validateSpecialScheduleRules(employeeShift, dto);
  //       return;
  //     }

  //     // Всем остальным графикам явка запрещена в выходной день
  //     if (dto.attendanceCode === EAttendanceCode.Y) {
  //       throw new ConflictException('Явка запрещена');
  //     }

  //     this.validateOtherHolidayRules(employeeShift, dto);
  //   }

  //   private validateSpecialScheduleRules(
  //     employeeShift: EmployeeShift,
  //     dto: UpdateEmployeeShiftDto,
  //   ): void {
  //     // Оплата только РВ
  //     if (
  //       dto.currentPaymentCode !==
  //         employeeShift.currentPosition.paymentSystem.paymentCode &&
  //       dto.currentPaymentCode !== EPaymentCode.RV
  //     ) {
  //       throw new ConflictException('Измените оплату');
  //     }

  //     // Время: если статус явка — минуты должны быть > 0
  //     // Время: если статус не явка — минут быть не должно
  //     if (
  //       (dto.minutes === 0 && dto.attendanceCode === EAttendanceCode.Y) ||
  //       (dto.minutes > 0 && !(dto.attendanceCode === EAttendanceCode.Y))
  //     ) {
  //       throw new ConflictException('Измените время или статус');
  //     }

  //     // Время: если тип оплаты: РВ — минуты должны быть > 0
  //     // Время: если тип оплаты: не РВ — минут быть не должно
  //     if (
  //       (dto.minutes === 0 && dto.currentPaymentCode === EPaymentCode.RV) ||
  //       (dto.minutes > 0 && !(dto.currentPaymentCode === EPaymentCode.RV))
  //     ) {
  //       throw new ConflictException('Измените время или статус');
  //     }

  //     // Согласованность СВС и статуса
  //     if (
  //       (dto.isPresent === null && dto.attendanceCode === EAttendanceCode.Y) ||
  //       (dto.isPresent !== null && !(dto.attendanceCode === EAttendanceCode.Y))
  //     ) {
  //       throw new ConflictException('Измените СВС или статус');
  //     }

  //     // Согласованность рабочего места и статуса
  //     if (
  //       (dto.workplaceName === null &&
  //         dto.attendanceCode === EAttendanceCode.Y) ||
  //       (dto.workplaceName !== null &&
  //         !(dto.attendanceCode === EAttendanceCode.Y))
  //     ) {
  //       throw new ConflictException('Измените место или статус');
  //     }
  //   }

  //   private validateOtherHolidayRules(
  //     employeeShift: EmployeeShift,
  //     dto: UpdateEmployeeShiftDto,
  //   ): void {
  //     if (
  //       dto.currentPositionCode !== employeeShift.currentPosition.positionCode
  //     ) {
  //       throw new ConflictException('Нельзя изменить позицию');
  //     }

  //     if (
  //       dto.currentPaymentCode !==
  //       employeeShift.currentPosition.paymentSystem.paymentCode
  //     ) {
  //       throw new ConflictException('Нельзя изменить оплату');
  //     }

  //     if (dto.minutes > 0) {
  //       throw new ConflictException('Удалите время');
  //     }

  //     if (dto.isPresent !== null) {
  //       throw new ConflictException('Удалите посещение СВС');
  //     }

  //     if (dto.workplaceName !== null) {
  //       throw new ConflictException('Удалите рабочее место');
  //     }
  //   }

  //   private validateWorkShift(
  //     employeeShift: EmployeeShift,
  //     dto: UpdateEmployeeShiftDto,
  //   ): void {
  //     const paymentCodes = [
  //       EAttendanceCode.DSR,
  //       EAttendanceCode.OSR,
  //       EAttendanceCode.RV,
  //     ];

  //     // Нельзя выбрать ДСР, ОСР, РВ для работника по КЛС в этой бригаде и цехе
  //     if (
  //       employeeShift.shift.workshop.workshopCode ===
  //         employeeShift.employee.position.workshop.workshopCode &&
  //       employeeShift.shift.team.teamNumber ===
  //         employeeShift.employee.team.teamNumber &&
  //       paymentCodes.includes(dto.currentPaymentCode as EAttendanceCode)
  //     ) {
  //       throw new ConflictException('Измените оплату труда');
  //     }

  //     // Время: если статус явка — минуты должны быть > 0
  //     // Время: если статус не явка — минут быть не должно
  //     if (
  //       (dto.minutes === 0 && dto.attendanceCode === EAttendanceCode.Y) ||
  //       (dto.minutes > 0 && !(dto.attendanceCode === EAttendanceCode.Y))
  //     ) {
  //       throw new ConflictException('Измените время или статус');
  //     }

  //     // Согласованность СВС и статуса
  //     if (
  //       (dto.isPresent === null && dto.attendanceCode === EAttendanceCode.Y) ||
  //       (dto.isPresent !== null && !(dto.attendanceCode === EAttendanceCode.Y))
  //     ) {
  //       throw new ConflictException('Измените СВС или статус');
  //     }

  //     // Согласованность рабочего места и статуса
  //     if (
  //       (dto.workplaceName === null &&
  //         dto.attendanceCode === EAttendanceCode.Y) ||
  //       (dto.workplaceName !== null &&
  //         !(dto.attendanceCode === EAttendanceCode.Y))
  //     ) {
  //       throw new ConflictException('Измените место или статус');
  //     }
  //   }

  //   private hasShiftChanges(
  //     shift: Shift,
  //     employee: Employee,
  //     dto: UpdateEmployeeShiftDto,
  //   ): boolean {
  //     return (
  //       shift.workshop.workshopCode !== employee.position.workshop.workshopCode ||
  //       shift.team.teamNumber !== employee.team.teamNumber ||
  //       employee.position.positionCode !== dto.currentPositionCode ||
  //       employee.position.paymentSystem.paymentCode !== dto.currentPaymentCode
  //     );
  //   }

  //   async deleteEmployeeShift(dto: DeleteEmployeeShiftDto): Promise<ISuccess> {
  //     const shift = await this.shiftService.getShiftById(dto.shiftId);

  //     // Ищем нужную запись смены сотрудника в уже загруженной смене
  //     const employeeShift = shift.employeeShifts.find(
  //       (es) => es.id === dto.employeeShiftId,
  //     );

  //     if (!employeeShift) {
  //       throw new NotFoundException(
  //         `Смена сотрудника с ID ${dto.employeeShiftId} не найдена в смене ${dto.shiftId}`,
  //       );
  //     }

  //     // Спецправило для ЛПЦ-11: нельзя удалять при графике 2 или 2‑А
  //     // Нормализуем график сотрудника для ЛПЦ‑11: 2 → 2‑А
  //     const normalizedEmployeeScheduleCode = normalizeScheduleCode(
  //       employeeShift.employee.position.workshop.workshopCode,
  //       employeeShift.employee.position.schedule.scheduleCode,
  //     );

  //     // Базовое правило «сотрудник по КЛС» — нельзя удалять, если все параметры совпадают
  //     const isNative =
  //       shift.workshop.workshopCode ===
  //         employeeShift.employee.position.workshop.workshopCode &&
  //       shift.team.teamNumber === employeeShift.employee.team.teamNumber &&
  //       shift.schedule.scheduleCode === normalizedEmployeeScheduleCode;

  //     if (isNative) {
  //       throw new ConflictException('Сотрудник по КЛС');
  //     }

  //     // Если всё ок — удаляем
  //     await this.employeeShiftService.deleteEmployeeShift(employeeShift.id);

  //     return { message: 'Смена сотрудника успешно удалена' };
  //   }

  //   private async getShiftDurationMinutes(shift: Shift): Promise<number> {
  //     // Если shiftSchedule = null (выходной), то
  //     // График 5-Б-1 dayOfWeek = 1 (понедельник)
  //     // График 2-А и 9 dayOfWeek = 0 (универсальный)
  //     // У всех расписаний shiftCode = 2 (смена 2 - дневная)
  //     const dayOfWeek = shift.shiftSchedule?.dayOfWeek ?? null;

  //     const resolvedDayOfWeek =
  //       dayOfWeek === null
  //         ? shift.schedule.scheduleCode === ESchedule.S_5B1
  //           ? 1
  //           : 0
  //         : dayOfWeek;

  //     const shiftSchedule = await this.shiftScheduleService.getShiftSchedule(
  //       resolvedDayOfWeek,
  //       shift.workshop.workshopCode,
  //       shift.schedule.scheduleCode,
  //       shift.shiftSchedule?.shiftType?.shiftCode ?? 2,
  //     );

  //     return this.calculateShiftDuration(shiftSchedule);
  //   }

  //   private calculateShiftDuration(schedule: ShiftSchedule | null): number {
  //     if (!schedule) {
  //       return 0;
  //     }

  //     const toMin = (t: string | null): number => {
  //       if (!t) return 0;
  //       // Безопасный парсинг времени ЧЧ:ММ
  //       const [hStr, mStr] = t.split(':');
  //       const h = Number(hStr ?? 0);
  //       const m = mStr ? Number(mStr) : 0;

  //       // Защита от некорректных данных
  //       if (isNaN(h) || isNaN(m)) return 0;

  //       return h * 60 + m;
  //     };

  //     const start = toMin(schedule.startTime);
  //     let end = toMin(schedule.endTime);

  //     // Если конец раньше начала — смена пересекает полночь
  //     if (end < start) {
  //       end += 24 * 60; // +1440 минут
  //     }

  //     let lunchDuration = 0;
  //     if (schedule.lunchStart && schedule.lunchEnd) {
  //       const ls = toMin(schedule.lunchStart);
  //       const le = toMin(schedule.lunchEnd);

  //       lunchDuration = le - ls;

  //       // Обед тоже может пересекать полночь (редко, но бывает)
  //       if (lunchDuration < 0) {
  //         lunchDuration += 24 * 60;
  //       }
  //     }

  //     const totalMinutes = Math.max(0, end - start - lunchDuration);

  //     // Возвращаем сразу минуты (целое число), без округления до четверти часа
  //     return Math.round(totalMinutes);
  //   }

  //   private handleNoticeError(error: unknown): never {
  //     if (error instanceof QueryFailedError) {
  //       // Проверяем, похоже ли на нарушение уникального ограничения (частая причина «Смена уже создана»)
  //       const isUniqueViolation =
  //         error.message.includes('duplicate key') ||
  //         error.message.includes('unique constraint') ||
  //         error.message.includes('already exists');

  //       if (isUniqueViolation) {
  //         // return { message: 'Смена уже создана' };
  //         throw new ConflictException('Работник уже добавлен');
  //       }

  //       // Если это QueryFailedError, но не про уникальность — лучше пробросить как конфликт или серверную ошибку
  //       throw new ConflictException(
  //         'Не удалось добавить работника: конфликт данных',
  //       );
  //     }

  //     // Для всех остальных ошибок — стандартная серверная ошибка
  //     throw new InternalServerErrorException(
  //       `Не удалось добавить работника: ${error}`,
  //     );
  //   }
}
