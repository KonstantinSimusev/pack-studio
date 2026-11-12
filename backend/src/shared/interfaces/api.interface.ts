export interface IList<T> {
  total: number;
  items: T[];
}

export interface ISuccess {
  message: string;
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
  isActive: boolean;
}

export interface IEmployeeInfo {
  id: string;
  lastName: string;
  firstName: string;
  patronymic: string;
  personalNumber: number;

  isActive: boolean;

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

// export interface IShiftInfo {
//   dayOfWeek: number;
//   date: Date;
//   shiftCode: number | null;
//   teamNumber: number;
// }

// export interface IShift {
//   id: string;
//   date: Date; // формат YYYY-MM-DD
//   workshopCode: string;
//   teamNumber: number;
//   scheduleCode: string;
//   dayOfWeek: number;
//   shiftCode: number | null;
//   employeeShifts: IEmployeeShift[];
// }

// export interface IEmployeeShift {
//   id: string;
//   currentPositionCode: number; // берем из распоряжения, если нет из КЛС
//   currentProfessionName: string; // берем из распоряжения, если нет из КЛС
//   currentPaymentCode: string; // берем из распоряжения, если нет из КЛС
//   attendanceCode: string;
//   minutes: number;
//   isPresent: boolean | null;
//   workplaceName: string | null;
//   canDelete: boolean;
//   isReady: boolean;
//   employee: IEmployee;
// }

// export interface IEmployee {
//   id: string;
//   lastName: string;
//   firstName: string;
//   patronymic: string;
//   personalNumber: number;
//   workshopCode: string;
//   teamNumber: number;
//   positionCode: number;
//   professionCode: string;
//   professionName: string;
//   scheduleCode: string;
// }
