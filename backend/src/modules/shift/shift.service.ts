import { Injectable, NotFoundException } from '@nestjs/common';

import { IEmployeeShift, IShift } from '../../shared/interfaces/api.interface';
import { EProfessionCode } from '../../shared/enums/enums';

import { EmployeeShift } from '../employee-shift/entities/employee-shift.entity';
import { Shift } from './entities/shift.entity';
import { ShiftRepository } from './shift.repository';
import { ShiftIdDto } from './dto/shift-id.dto';

@Injectable()
export class ShiftService {
  constructor(private readonly shiftRepository: ShiftRepository) {}

  async getShiftById(id: string): Promise<Shift> {
    const shift = await this.shiftRepository.findById(id);

    if (!shift) {
      throw new NotFoundException(`Смена с ID ${id} не найдена`);
    }

    return shift;
  }

  async getLastShift(
    workshopId: string,
    teamId: string,
    scheduleId: string,
  ): Promise<Shift | null> {
    const shift = await this.shiftRepository.findLastShift(
      workshopId,
      teamId,
      scheduleId,
    );

    if (!shift) {
      throw new NotFoundException('Смена не найдена');
    }

    return shift;
  }

  async getShiftByIdWithEmployeesShifts(id: string): Promise<IShift> {
    const shift = await this.shiftRepository.findByIdWithEmployeesShifts(id);

    if (!shift) {
      throw new NotFoundException(`Смена с ID ${id} не найдена`);
    }

    return this.mapToIShift(shift);
  }

  async existsShift(
    date: Date,
    shiftCode: number,
    workshopId: string,
    scheduleId: string,
  ): Promise<void> {
    const count = await this.shiftRepository.countByProfile(
      date,
      shiftCode,
      workshopId,
      scheduleId,
    );

    if (count > 0) {
      throw new NotFoundException('Смена уже создана');
    }
  }

  private mapToIShift(shift: Shift): IShift {
    return {
      id: shift.id,
      date: shift.date, // формат YYYY-MM-DD
      workshopCode: shift.workshop.workshopCode,
      teamNumber: shift.team.teamNumber,
      scheduleCode: shift.schedule.scheduleCode,
      scheduleName: shift.schedule.name,
      shiftCode: shift.shiftCode,
      employeeShifts: shift.employeeShifts
        .map((employeeShift) => this.mapEmployeeShift(employeeShift))
        .sort(this.compareByProfession),
    };
  }

  private mapEmployeeShift(employeeShift: EmployeeShift): IEmployeeShift {
    return {
      id: employeeShift.id,
      isReady: employeeShift.isReady,
      shiftProfessionCode: employeeShift.shiftProfession.professionCode,
      shiftProfessionName: employeeShift.shiftProfession.name,
      attendanceCode: employeeShift.attendanceType.attendanceCode,
      workplaceName: employeeShift.workplace?.name ?? null,
      employee: {
        id: employeeShift.employee.id,
        lastName: employeeShift.employee.lastName,
        firstName: employeeShift.employee.firstName,
        patronymic: employeeShift.employee.patronymic,
        personalNumber: employeeShift.employee.personalNumber,
        homeWorkshopCode: employeeShift.employee.homeWorkshop.workshopCode,
        homeTeamNumber: employeeShift.employee.homeTeam.teamNumber,
      },
    };
  }

  private compareByProfession(a: IEmployeeShift, b: IEmployeeShift): number {
    const PROFESSIONS = Object.values(EProfessionCode);
    const rank = (code: string) => PROFESSIONS.indexOf(code as EProfessionCode);

    return (
      rank(a.shiftProfessionCode) - rank(b.shiftProfessionCode) ||
      a.employee.lastName.localeCompare(b.employee.lastName, 'ru') ||
      a.employee.firstName.localeCompare(b.employee.firstName, 'ru') ||
      a.employee.patronymic.localeCompare(b.employee.patronymic, 'ru')
    );
  }

  // async getAllShiftByDate(
  //   date: Date,
  //   workshopId: string,
  //   teamId: string,
  //   scheduleId: string,
  // ): Promise<Shift[]> {
  //   const shifts = await this.shiftRepository.findAllByDate(
  //     date,
  //     workshopId,
  //     teamId,
  //     scheduleId,
  //   );

  //   return shifts;
  // }

  // async setCheckedByShiftId(dto: ShiftIdDto): Promise<ISuccess> {
  //   const shift = await this.shiftRepository.findOneById(dto.id);

  //   if (!shift) {
  //     throw new NotFoundException(`Смена с ID ${dto.id} не найдена`);
  //   }

  //   shift.isChecked = true;
  //   await this.shiftRepository.save(shift);

  //   return { message: 'Поле обновлено' };
  // }

  /*
  async setCheckedByShiftId(dto: ShiftIdDto): Promise<ISuccess> {
    // Загружаем смену со всеми связями (включая currentPosition.profession)
    const shift = await this.shiftRepository.findOneById(dto.id);

    // Проверяем, что смена существует
    if (!shift) {
      throw new NotFoundException(`Смена с ID ${dto.id} не найдена`);
    }

    // Вычисляем: выходной или рабочий день
    // shiftSchedule === null → выходной (создаётся через createShiftForHoliday)
    const isDayOff = !shift.shiftSchedule;

    if (isDayOff) {
      // Получаем тип посещаемости "В" (выходной)
      const attendanceTypeV =
        await this.attendanceTypeService.getAttendanceType(EAttendanceCode.V);

      // Всем сотрудникам ставим тип "В" — рабочее место не нужно
      for (const es of shift.employeeShifts) {
        es.attendanceType = attendanceTypeV;
        // workplace остаётся null — для выходного это нормально
      }
    } else {
      // Рабочий день — назначаем рабочие места по профессии позиции
      for (const es of shift.employeeShifts) {
        // Если рабочее место уже назначено — пропускаем
        if (es.workplace) continue;

        // Получаем профессию из текущей позиции сотрудника
        const professionId = es.currentPosition?.profession?.id;

        if (!professionId) {
          throw new ConflictException(
            `У сотрудника в employee_shift ${es.id} не определена профессия в позиции`,
          );
        }

        // Ищем рабочее место по цеху смены и профессии позиции
        const workplace =
          await this.workplaceRepository.findByWorkshopAndProfession(
            shift.workshop.id,
            professionId,
          );

        if (!workplace) {
          throw new NotFoundException(
            `Рабочее место не найдено для цеха ${shift.workshop.id} и профессии ${professionId}`,
          );
        }

        es.workplace = workplace;
      }
    }

    // Сохраняем обновлённые записи сотрудников
    await this.employeeShiftRepository.save(shift.employeeShifts);

    // Отмечаем смену как проверенную
    shift.isChecked = true;
    await this.shiftRepository.save(shift);

    return { message: 'Поле обновлено' };
  }
  */
}
