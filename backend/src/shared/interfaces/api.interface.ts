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

export interface ITokenOptions<T> {
  payload: T;
  secretKey: string; // ключ в конфиге для секрета
  expiresInKey: string; // ключ в конфиге для времени жизни
}

export interface IJwtPayload {
  sub: string;
  iat?: number;
  exp?: number;
}

export interface IProfession {
  professionCode: string;
  name: string;
}

export interface ISchedule {
  scheduleCode: string;
  name: string;
}

export interface ITeam {
  teamNumber: number;
}

export interface IWorkshop {
  workshopCode: string;
  name: string;
}

export interface IAttendanceType {
  attendanceCode: string;
  description: string;
}

export interface IReportType {
  typeCode: string;
  name: string;
}

export interface IReportArea {
  areaCode: string;
  name: string;
  workshopCode: string;
  reportTypeCode: string; // production, shipment, pack, fix, residue
}

export interface IWorkplaceData {
  name: string;
  workshopCode: string;
  professionCode: string;
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

export interface IShiftInfo {
  dayOfWeek: number;
  date: Date;
  shiftCode: number | null;
  teamNumber: number;
}

// TimesheetPage
export interface ILastShift {
  id: string;
  date: Date; // формат YYYY-MM-DD
  shiftCode: number;
  scheduleCode: string;
  scheduleName: string;
  isReady: boolean; // вычисляемое поле
}

// ShiftPage
export interface IShift {
  id: string;
  date: Date; // формат YYYY-MM-DD
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
  canDelete: boolean; // вычисляемое поле
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
