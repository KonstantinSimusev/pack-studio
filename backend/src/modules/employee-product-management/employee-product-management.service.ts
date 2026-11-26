import { Injectable, NotFoundException } from '@nestjs/common';

import { isRelevantShift } from '../../shared/utils/utils';
import { IProfile, ISuccess } from '../../shared/interfaces/api.interface';

import { CreateEmployeeProductDto } from './dto/create-employee-product.dto';

import { EmployeeProductRepository } from '../employee-product/employee-product.repository';

import { ActionTypeService } from '../action-type/action-type.service';
import { EmployeeProductService } from '../employee-product/employee-product.service';
import { EmployeeService } from '../employee/employee.service';
import { ScheduleService } from '../schedule/schedule.service';
import { ShiftService } from '../shift/shift.service';
import { TeamService } from '../team/team.service';
import { WorkshopService } from '../workshop/workshop.service';

@Injectable()
export class EmployeeProductManagementService {
  constructor(
    private readonly employeeProductRepository: EmployeeProductRepository,
    private readonly actionTypeService: ActionTypeService,
    private readonly employeeProductService: EmployeeProductService,
    private readonly employeeService: EmployeeService,
    private readonly scheduleService: ScheduleService,
    private readonly shiftService: ShiftService,
    private readonly teamService: TeamService,
    private readonly workshopService: WorkshopService,
  ) {}

  async createEmployeeProduct(
    dto: CreateEmployeeProductDto,
    profile: IProfile,
  ): Promise<ISuccess> {
    // Получаем данные сотрудника, который сделал запрос
    const { employeeId, workshopCode, teamNumber, scheduleCode } = profile;

    // Получаем связянные сущности
    const [workshop, team, schedule, actionType, employee] = await Promise.all([
      this.workshopService.getWorkshopByCode(workshopCode),
      this.teamService.getTeamByNumber(teamNumber),
      this.scheduleService.getScheduleByCode(scheduleCode),
      this.actionTypeService.getActionTypeByCode(dto.actionCode),
      this.employeeService.getEntityById(employeeId),
    ]);

    // Получаем последнюю сохраненную смену в бд
    const shift = await this.shiftService.getLastShiftWithEmployeeProducts(
      workshop.id,
      team.id,
      schedule.id,
    );

    // Находим смену сотрудника
    const employeeShift = shift.employeeShifts.find(
      (item) => item.employee.id === employeeId,
    );

    if (!employeeShift) {
      throw new NotFoundException(
        `Смена сотрудника с ID сотрудника  ${employeeId} не найдена`,
      );
    }

    // Проверяем дубликат в базе данных
    await this.employeeProductService.hasEmployeeProductDuplicate(
      dto.actionCode,
      dto.heatNumber,
      dto.partyNumber,
      dto.productNumber,
    );

    // Создаем продукцию сотрудника
    const employeeProduct = await this.employeeProductRepository.create({
      heatNumber: dto.heatNumber,
      partyNumber: dto.partyNumber,
      productNumber: dto.productNumber,
      actionType,
      employeeShift,
      employee,
    });

    // console.log
    console.log(employeeProduct);

    return {
      message: 'Продукция сотрудника создана успешно',
    };
  }

  // Проверяем последнюю смену на актуальность
  // Если смена старая, то выходим из метода - создаем новую смену
  // if (!isRelevantShift(shift.date, shift.shiftCode)) {
  //   return null;
  // }
}
