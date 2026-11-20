export interface IList<T> {
  total: number;
  items: T[];
}

export interface ISuccess {
  message: string;
}

export interface IAddSuccess {
  message: string;
  employeeShiftId: string;
}

export interface ILoginData {
  login: string;
  password: string;
}

export interface IAccountInfo {
  lastName: string;
  firstName: string;
  patronymic: string;
  login: string;
  password: string;
}

export interface IProfile {
  employeeId: string;
  lastName: string;
  firstName: string;
  patronymic: string;
  personalNumber: number;
  workshopCode: string;
  workshopName: string;
  teamNumber: number;
  professionCode: string;
  professionName: string;
  scheduleCode: string;
  scheduleName: string;
  hasAccess: boolean;
}

export interface ICreateEmployee {
  lastName: string;
  firstName: string;
  patronymic: string;
  personalNumber: number;
  workshopCode: string;
  teamNumber: number;
  professionCode: string;
  scheduleCode: string;
}

export interface IUpdateEmployee {
  id: string;
  hasAccess: boolean;

  currentWorkshopCode: string;
  currentTeamNumber: number;
  currentProfessionCode: string;
  currentScheduleCode: string;

  homeWorkshopCode: string;
  homeTeamNumber: number;
  homeProfessionCode: string;
  homeScheduleCode: string;
}

export interface IEmployeeInfo {
  id: string;
  lastName: string;
  firstName: string;
  patronymic: string;
  personalNumber: number;

  hasAccess: boolean;

  currentWorkshopCode: string;
  currentWorkshopName: string;
  currentTeamNumber: number;
  currentProfessionCode: string;
  currentProfessionName: string;
  currentScheduleCode: string;
  currentScheduleName: string;

  homeWorkshopCode: string;
  homeWorkshopName: string;
  homeTeamNumber: number;
  homeProfessionCode: string;
  homeProfessionName: string;
  homeScheduleCode: string;
  homeScheduleName: string;
}

export interface ICreateShift {
  date: string; // формат YYYY-MM-DD
  shiftCode: number;
}

// TimesheetPage
export interface ILastShift {
  id: string;
  date: string; // формат YYYY-MM-DD
  shiftCode: number;
  scheduleCode: string;
  scheduleName: string;
  isReady: boolean;
}

export interface IShift {
  id: string;
  date: string; // формат YYYY-MM-DD
  shiftCode: number;
  workshopCode: string;
  teamNumber: number;
  employeeShifts: IEmployeeShift[];
}

export interface IEmployeeShift {
  id: string;
  isReady: boolean;
  shiftProfessionCode: string;
  shiftProfessionName: string;
  attendanceCode: string;
  workplaceName: string | null;
  employee: IEmployee;
  canDelete: boolean;
}

export interface IEmployee {
  id: string;
  lastName: string;
  firstName: string;
  patronymic: string;
  personalNumber: number;
  homeWorkshopCode: string;
  homeTeamNumber: number;
}

export interface ICreateEmployeeShift {
  shiftId: string;
  personalNumber: number;
}

export interface IUpdateEmployeeShift {
  id: string;
  shiftProfessionCode: string;
  attendanceCode: string;
  workplaceName: string | null;
}

// ReportPage
export interface IShiftReport {
  id: string;
  date: Date; // формат YYYY-MM-DD
  shiftCode: number;
  workshopCode: string;
  teamNumber: number;
  reports: IReport[];
}

export interface IReport {
  id: string;
  type: string;
  areaCode: string;
  areaName: string;
  count: number;
}

export interface IUpdateReport {
  id: string;
  count: number;
}

export interface IHomeTeam {
  id: string;
  workshopName: string;
  teamNumber: number;
  managerLastName: string;
  managerFirstName: string;
  managerPatronymic: string;
  workersCount: number;
}

export interface IChart {
  id: string;
  title: string;
  count: number;
}

export interface IAbsence {
  name: string;
  count: number;
}
