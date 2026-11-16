export enum EWorkshopCode {
  W_LPC4 = 'W_LPC4',
  W_LPC5 = 'W_LPC5',
  W_LPC8_UGP = 'W_LPC8_UGP',
  W_LPC8_UL = 'W_LPC8_UL',
  W_LPC10 = 'W_LPC10',
  W_LPC11 = 'W_LPC11',
  W_PMP_NORTH = 'W_PMP_NORTH',
  W_PMP_SOUTH = 'W_PMP_SOUTH',
}

export enum ETeamNumber {
  T_1 = 1,
  T_2 = 2,
  T_3 = 3,
  T_4 = 4,
  T_5 = 5,
}

export enum EProfessionCode {
  EXECUTIVE = 'EXECUTIVE', // Директор
  HEAD_PRODUCTION = 'HEAD_PRODUCTION', // Начальник производства (в промышленности)
  SENIOR_MANAGER = 'SENIOR_MANAGER', // Старший менеджер
  HEAD = 'HEAD', // Начальник участка
  LEAD_MASTER = 'LEAD_MASTER', // Старший мастер
  MASTER = 'MASTER', // Сменный мастер
  DETAIL_MASTER = 'DETAIL_MASTER', // Мастер реквизитов
  LEAD_OPERATOR = 'LEAD_OPERATOR', // Оператор поста управления (старший)
  OPERATOR = 'OPERATOR', // Оператор поста управления
  PACKER_LUM = 'PACKER_LUM', // Укладчик-упаковщик ЛУМ
  PACKER_APR8 = 'PACKER_APR8', // Укладчик-упаковщик АПР-8
  PACKER = 'PACKER', // Укладчик-упаковщик
  STACKER = 'STACKER', // Штабелировщик
  STAMPER = 'STAMPER', // Штамповщик
  PRODUCTION_FOREMAN = 'PRODUCTION_FOREMAN', // Бригадир на УОП
  PACKING_FOREMAN = 'PACKING_FOREMAN', // Бригадир на ОГП
  REPAIR_MECHANIC = 'REPAIR_MECHANIC', // Слесарь-ремонтник
  DRIVER = 'DRIVER', // Водитель погрузчика
  CUTTER = 'CUTTER', // Резчик холодного металла
  GAS_CUTTER = 'GAS_CUTTER', // Газорезчик
}

export enum EScheduleCode {
  S_5B1 = 'S_5B1',
  S_2A = 'S_2A',
  S_9 = 'S_9',
  S_2 = 'S_2',
}

export enum EShiftCode {
  NIGHT = 1,
  DAY = 2,
}

export enum EAttendanceCode {
  // Бригады
  T_1 = 'T_1',
  T_2 = 'T_2',
  T_3 = 'T_3',
  T_4 = 'T_4',
  T_5 = 'T_5',

  // Подразделения
  W_LPC4 = 'W_LPC4',
  W_LPC5 = 'W_LPC5',
  W_LPC8_UGP = 'W_LPC8_UGP',
  W_LPC8_UL = 'W_LPC8_UL',
  W_LPC10 = 'W_LPC10',
  W_LPC11 = 'W_LPC11',
  W_PMP_SOUTH = 'W_PMP_SOUTH',
  W_PMP_NORTH = 'W_PMP_NORTH',

  // Отсутствия и состояния
  A = 'А',
  B = 'Б',
  V = 'В',
  D = 'Д',
  K = 'К',
  KU = 'КУ',
  NB = 'НБ',
  ND = 'НД',
  NN = 'НН',
  OJ = 'ОЖ',
  OI = 'ОИ',
  OS = 'ОС',
  OT = 'ОТ',
  PM = 'ПМ',
  PR = 'ПР',
  PTD = 'ПТД',
  Y = 'Я',
}
