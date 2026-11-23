import { formatDateForDayUI } from './utils';

export const WORKSHOP_CODE = {
  W_ABK: 'W_ABK',
  W_LPC4: 'W_LPC4',
  W_LPC5: 'W_LPC5',
  W_LPC8_UGP: 'W_LPC8_UGP',
  W_LPC8_UL: 'W_LPC8_UL',
  W_LPC10: 'W_LPC10',
  W_LPC11: 'W_LPC11',
  W_PMP_NORTH: 'W_PMP_NORTH',
  W_PMP_SOUTH: 'W_PMP_SOUTH',
};

export const TEAM_NUMBER = {
  T_1: '1',
  T_2: '2',
  T_3: '3',
  T_4: '4',
  T_5: '5',
};

export const PROFESSION_CODE = {
  MANAGER: 'MANAGER', // Руководитель
  HEAD: 'HEAD', // Начальник участка
  LEAD_MASTER: 'LEAD_MASTER', // Старший мастер
  MASTER: 'MASTER', // Сменный мастер
  DETAIL_MASTER: 'DETAIL_MASTER', // Мастер реквизитов
  PRODUCTION_FOREMAN: 'PRODUCTION_FOREMAN', // Бригадир на УОП
  PACKING_FOREMAN: 'PACKING_FOREMAN', // Бригадир на ОГП
  PACKER: 'PACKER', // Укладчик-упаковщик
  PACKER_LUR: 'PACKER_LUR', // Укладчик-упаковщик ЛУР
  PACKER_APR8: 'PACKER_APR8', // Укладчик-упаковщик АПР-8
  REPAIR_MECHANIC: 'REPAIR_MECHANIC', // Слесарь-ремонтник
  STACKER: 'STACKER', // Штабелировщик
  STAMPER: 'STAMPER', // Штамповщик
  DRIVER: 'DRIVER', // Водитель погрузчика
  CUTTER: 'CUTTER', // Резчик холодного металла
  GAS_CUTTER: 'GAS_CUTTER', // Газорезчик
  LEAD_OPERATOR: 'LEAD_OPERATOR', // Оператор поста управления (старший)
  OPERATOR: 'OPERATOR', // Оператор поста управления
};

export const SCHEDULE_CODE = {
  S_5B1: 'S_5B1',
  S_2A: 'S_2A',
  S_9: 'S_9',
  S_2: 'S_2',
};

export const SHIFT_CODE = {
  NIGHT: 1,
  DAY: 2,
};

export const REPORT_TYPE_CODE = {
  PRODUCTION: '001_production',
  PACK: '002_pack',
  SHIPMENT: '003_shipment',
  RESIDUE: '004_residue',
};

// Динамичсекие пути
export const DYNAMIC_PATHS = ['/home', '/timesheet'];

// Конфигурация меню: путь, текст, роли и цеха, которым доступен пункт
export const MENU_ITEMS = [
  {
    path: '/home',
    label: 'Главная',
    accessRules: [
      {
        professions: [
          PROFESSION_CODE.MANAGER,
          PROFESSION_CODE.HEAD,
          PROFESSION_CODE.LEAD_MASTER,
          PROFESSION_CODE.MASTER,
          PROFESSION_CODE.DETAIL_MASTER,
          PROFESSION_CODE.PRODUCTION_FOREMAN,
        ],
        workshops: [WORKSHOP_CODE.W_LPC11],
      },
    ],
  },
  {
    path: '/timesheet',
    label: 'Табель',
    accessRules: [
      {
        professions: [PROFESSION_CODE.LEAD_MASTER], // для примера
        workshops: [WORKSHOP_CODE.W_LPC10], // для примера
      },
      {
        professions: [PROFESSION_CODE.MASTER, PROFESSION_CODE.DETAIL_MASTER],
        workshops: [WORKSHOP_CODE.W_LPC11],
      },
    ],
  },
  {
    path: '/production',
    label: 'Производство',
    accessRules: [
      {
        professions: [PROFESSION_CODE.MASTER],
        workshops: [WORKSHOP_CODE.W_LPC11],
      },
    ],
  },
  {
    path: '/pack',
    label: 'Упаковка',
    accessRules: [
      {
        professions: [PROFESSION_CODE.MASTER],
        workshops: [WORKSHOP_CODE.W_LPC11],
      },
    ],
  },
  {
    path: '/shipment',
    label: 'Отгрузка',
    accessRules: [
      {
        professions: [PROFESSION_CODE.MASTER],
        workshops: [WORKSHOP_CODE.W_LPC11],
      },
    ],
  },
  {
    path: '/residue',
    label: 'Остатки',
    accessRules: [
      {
        professions: [PROFESSION_CODE.MASTER],
        workshops: [WORKSHOP_CODE.W_LPC11],
      },
    ],
  },
  {
    path: '/employee',
    label: 'Персонал',
    accessRules: [
      {
        professions: [
          PROFESSION_CODE.LEAD_MASTER, // для примера
          PROFESSION_CODE.PRODUCTION_FOREMAN, // для примера
        ],
        workshops: [WORKSHOP_CODE.W_LPC10], // для примера
      },
      {
        professions: [PROFESSION_CODE.HEAD, PROFESSION_CODE.PRODUCTION_FOREMAN],
        workshops: [
          WORKSHOP_CODE.W_LPC5, // для примера
          WORKSHOP_CODE.W_PMP_SOUTH, // для примера
          WORKSHOP_CODE.W_LPC11,
        ],
      },
    ],
  },
];

export const WORKSHOP_OPTIONS = [
  { value: '', label: 'Не выбрано' },
  { value: WORKSHOP_CODE.W_LPC4, label: 'ЛПЦ-4' },
  { value: WORKSHOP_CODE.W_LPC5, label: 'ЛПЦ-5' },
  { value: WORKSHOP_CODE.W_LPC8_UGP, label: 'ЛПЦ-8 (УГП)' },
  { value: WORKSHOP_CODE.W_LPC8_UL, label: 'ЛПЦ-8 (УЛ)' },
  { value: WORKSHOP_CODE.W_LPC10, label: 'ЛПЦ-10' },
  { value: WORKSHOP_CODE.W_LPC11, label: 'ЛПЦ-11' },
  { value: WORKSHOP_CODE.W_PMP_NORTH, label: 'ПМП (СБ)' },
  { value: WORKSHOP_CODE.W_PMP_SOUTH, label: 'ПМП (ЮБ)' },
  { value: WORKSHOP_CODE.W_ABK, label: 'АБК' },
];

export const TEAM_OPTIONS = [
  { value: '', label: 'Не выбрано' },
  { value: TEAM_NUMBER.T_1, label: '1' },
  { value: TEAM_NUMBER.T_2, label: '2' },
  { value: TEAM_NUMBER.T_3, label: '3' },
  { value: TEAM_NUMBER.T_4, label: '4' },
  { value: TEAM_NUMBER.T_5, label: '5' },
];

export const PROFESSION_OPTIONS = [
  { value: '', label: 'Не выбрано' },
  { value: PROFESSION_CODE.LEAD_OPERATOR, label: 'Старший оператор ПУ' },
  { value: PROFESSION_CODE.OPERATOR, label: 'Оператор ПУ' },
  { value: PROFESSION_CODE.PACKING_FOREMAN, label: 'Бригадир ОГП' },
  { value: PROFESSION_CODE.PACKER, label: 'Укладчик-упаковщик' },
  { value: PROFESSION_CODE.PACKER_LUR, label: 'Укладчик-упаковщик ЛУР' },
  { value: PROFESSION_CODE.STACKER, label: 'Штабелировщик металла' },
  { value: PROFESSION_CODE.DRIVER, label: 'Водитель погрузчика' },
  { value: PROFESSION_CODE.CUTTER, label: 'Резчик х/м' },
  { value: PROFESSION_CODE.MASTER, label: 'Сменный мастер' },
  { value: PROFESSION_CODE.MANAGER, label: 'Руководитель' },
];

export const SCHEDULE_OPTIONS = [
  { value: '', label: 'Не выбрано' },
  { value: SCHEDULE_CODE.S_5B1, label: '5-Б-1' },
  { value: SCHEDULE_CODE.S_2A, label: '2-А' },
  { value: SCHEDULE_CODE.S_9, label: '9' },
  { value: SCHEDULE_CODE.S_2, label: '2' },
];

const getISODate = (date: Date): string => date.toISOString().slice(0, 10);

const today = new Date();
today.setUTCHours(0, 0, 0, 0);

const tomorrow = new Date(today);
tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

export const DATE_OPTIONS = [
  { value: '', label: 'Не выбрано' },
  { value: getISODate(today), label: formatDateForDayUI(today) },
  { value: getISODate(tomorrow), label: formatDateForDayUI(tomorrow) },
];

export const SHIFT_CODE_OPTIONS = [
  { value: '', label: 'Не выбрано' },
  { value: String(SHIFT_CODE.NIGHT), label: '1' },
  { value: String(SHIFT_CODE.DAY), label: '2' },
];

export const ATTENDANCE_TYPE = {
  Y: 'Я',
  V: 'В',
};

export const ATTENDANCE_OPTIONS = [
  { value: 'Я', label: 'Я — Часы работы' },
  { value: 'ОТ', label: 'ОТ — Ежегодный отпуск' },
  {
    value: 'Б',
    label: 'Б — Временная нетрудоспособность',
  },
  {
    value: 'НБ',
    label: 'НБ — Отпуск без сохранения',
  },
  { value: 'Д', label: 'Д — Донорский день' },
  {
    value: 'ОИ',
    label: 'ОИ — Уход за детьми-инвалидами',
  },
  { value: 'ОС', label: 'ОС — Отпуск социальный' },
  { value: 'К', label: 'К — Служебные командировки' },
  { value: 'КУ', label: 'КУ — Направление на обучение' },
  { value: 'НД', label: 'НД — Нерабочий праздничный день' },
  { value: 'НН', label: 'НН — Неявки по невыясненным причинам' },
  {
    value: 'ПР',
    label: 'ПР — Прогул',
  },
  { value: 'ПТД', label: 'ПТД — Приостановление действия ТК' },
  { value: 'А', label: 'А — Арест' },

  { value: 'БР1', label: 'Бригада №1' },
  { value: 'БР2', label: 'Бригада №2' },
  { value: 'БР3', label: 'Бригада №3' },
  { value: 'БР4', label: 'Бригада №4' },
  { value: 'БР5', label: 'Бригада №5' },

  { value: 'Л4', label: 'ЛПЦ-4' },
  { value: 'Л5', label: 'ЛПЦ-5' },
  { value: 'Л8Г', label: 'ЛПЦ-8 (УГП)' },
  { value: 'Л8Л', label: 'ЛПЦ-8 (УЛ)' },
  { value: 'Л10', label: 'ЛПЦ-10' },
  { value: 'Л11', label: 'ЛПЦ-11' },
  { value: 'ПМПЮ', label: 'ПМП (ЮБ)' },
  { value: 'ПМПС', label: 'ПМП (СБ)' },
];

export const WORK_PLACES_OPTIONS = [
  { value: '', label: 'Не выбрано' },
  {
    value: 'Линия упаковки рулонов',
    label: 'ЛУР',
  },
  {
    value: '1 очередь: СТАН-2000',
    label: '1 очередь',
  },
  {
    value: '2 очередь: АНГЦ + АНО-ГЦ + АИ',
    label: '2 очередь',
  },
  {
    value: '3 очередь: АНГЦ-3',
    label: '3 очередь',
  },
  {
    value: 'Ж/д тупик № 6',
    label: 'Ж/д тупик № 6',
  },
  {
    value: 'Ж/д тупик № 7',
    label: 'Ж/д тупик № 7',
  },
  {
    value: 'Ж/д тупик № 8',
    label: 'Ж/д тупик № 8',
  },
  {
    value: 'Ж/д тупик № 10',
    label: 'Ж/д тупик № 10',
  },
  {
    value: 'Производство реквизитов',
    label: 'Реквизиты',
  },
];
