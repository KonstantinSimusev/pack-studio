export interface IList<T> {
  total: number;
  items: T[];
}

export interface ISuccess {
  message: string;
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

  profileWorkshopCode: string;
  profileTeamNumber: number;
  profilePositionCode: number;
  profileProfessionName: string;
  profileRoleName: string;

  hasAccess: boolean;
}

export interface IEmployeeInfo {
  id: string;

  profileWorkshopCode: string;
  profileTeamNumber: number;
  profilePositionCode: number;
  profileProfessionName: string;
  profileRoleName: string;

  hasAccess: boolean;

  lastName: string;
  firstName: string;
  patronymic: string;
  professionName: string;
  workshopCode: string;
  teamNumber: number;
  personalNumber: number;
  positionCode: number;
  birthDay: Date;
  startDate: Date;
  endDate: Date | null;
  isActive: boolean;
}

export interface ICreateEmployee {
  lastName: string;
  firstName: string;
  patronymic: string;
  personalNumber: string;
  teamNumber: string;
  positionCode: string;
  birthDay: string;
  startDate: string;
}

export interface IUpdateEmployee {
  id: string;

  profileTeamNumber: number;
  profilePositionCode: number;

  hasAccess: boolean;

  lastName: string;
  firstName: string;
  patronymic: string;
  personalNumber: number;
  teamNumber: number;
  positionCode: number;

  birthDay: string;
  startDate: string;
  endDate: string | null;
}

// export interface IShift {
//   id: string;
//   date: string; // формат YYYY-MM-DD
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
//   gradeCode: number;
//   scheduleCode: string;
//   paymentCode: string;
// }

// export interface IUpdateEmployeeShift {
//   shiftId: string;
//   employeeShiftId: string;
//   employeeId: string;

//   currentPositionCode: number; // берем из распоряжения, если нет из КЛС
//   currentPaymentCode: string; // берем из распоряжения, если нет из КЛС
//   attendanceCode: string;
//   minutes: number;
//   isPresent: boolean | null;
//   workplaceName: string | null;
// }

// export interface ICreateEmployeeShift {
//   shiftId: string;
//   personalNumber: number;
// }

// export interface IDeleteEmployeeShift {
//   shiftId: string;
//   employeeShiftId: string;
// }
