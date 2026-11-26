import { Injectable } from '@nestjs/common';

import { hasManager } from '../../shared/utils/utils';
import { EWorkshopCode } from '../../shared/enums/enums';
import { IHomeTeam } from '../../shared/interfaces/api.interface';

import { EmployeeRepository } from '../employee/employee.repository';

import { TeamService } from '../team/team.service';
import { WorkshopService } from '../workshop/workshop.service';

@Injectable()
export class TeamManagementService {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly teamService: TeamService,
    private readonly workshopService: WorkshopService,
  ) {}

  // Метод для HomePage
  async getHomeTeams(): Promise<IHomeTeam[]> {
    // ВАЖНО!!! Не использовать profile: IProfile
    // Сейчас только один цех в разарботке
    // Ручками назначил цех и график (Enum)
    // При маштабировании эти данные берем с клиента
    const workshopCode = EWorkshopCode.W_LPC11;

    // Получаем связянные сущности
    const workshop = await this.workshopService.getWorkshopByCode(workshopCode);
    const allEmployees = await this.employeeRepository.findAllByWorkshop(
      workshop.id,
    );

    const teamNumbers = [1, 2, 3, 4];
    const homeTeams: IHomeTeam[] = [];

    for (const teamNumber of teamNumbers) {
      const team = await this.teamService.getTeamByNumber(teamNumber);
      const teamEmployees =
        await this.employeeRepository.findAllByWorkshopAndTeam(
          workshop.id,
          team.id,
        );

      // Руководитель — активный по назначению, не по КЛС
      const manager =
        allEmployees.find(
          (employee) =>
            employee.assignment.isActive &&
            employee.assignment.currentTeam.teamNumber === teamNumber &&
            hasManager(employee.assignment.currentProfession.professionCode),
        ) ??
        teamEmployees.find((employee) =>
          hasManager(employee.homeProfession.professionCode),
        );

      // Считаем только рядовых работников — без руководителей
      const employeesCount = teamEmployees.filter(
        (employee) => !hasManager(employee.homeProfession.professionCode),
      ).length;

      homeTeams.push({
        workshopName: workshop.name,
        teamNumber: team.teamNumber,
        managerLastName: manager.lastName,
        managerFirstName: manager.firstName,
        managerPatronymic: manager?.patronymic,
        teamEmployeesTotal: employeesCount,
      });
    }

    return homeTeams;
  }
}
