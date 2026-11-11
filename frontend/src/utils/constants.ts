export const WORKSHOP_CODE = {
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
  EXECUTIVE: 'EXECUTIVE', // Директор
  HEAD_PRODUCTION: 'HEAD_PRODUCTION', // Начальник производства (в промышленности)
  SENIOR_MANAGER: 'SENIOR_MANAGER', // Старший менеджер
  HEAD: 'HEAD', // Начальник участка
  LEAD_MASTER: 'LEAD_MASTER', // Старший мастер
  MASTER: 'MASTER', // Сменный мастер
  DETAIL_MASTER: 'DETAIL_MASTER', // Мастер реквизитов
  PRODUCTION_FOREMAN: 'PRODUCTION_FOREMAN', // Бригадир на УОП
  PACKING_FOREMAN: 'PACKING_FOREMAN', // Бригадир на ОГП
  PACKER: 'PACKER', // Укладчик-упаковщик
  UNIT_PACKER: 'UNIT_PACKER', // Укладчик-упаковщик ЛУМ
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

// Динамичсекие пути
export const DYNAMIC_PATHS = ['/timesheet'];

// Конфигурация меню: путь, текст, роли и цеха, которым доступен пункт
export const MENU_ITEMS = [
  {
    path: '/home',
    label: 'Главная',
    accessRules: [
      {
        professions: [
          PROFESSION_CODE.EXECUTIVE,
          PROFESSION_CODE.HEAD_PRODUCTION,
          PROFESSION_CODE.SENIOR_MANAGER,
          PROFESSION_CODE.HEAD,
          PROFESSION_CODE.LEAD_MASTER,
          PROFESSION_CODE.MASTER,
          PROFESSION_CODE.DETAIL_MASTER,
          PROFESSION_CODE.PRODUCTION_FOREMAN,
          PROFESSION_CODE.PACKER,
        ],
        workshops: [
          WORKSHOP_CODE.W_LPC4,
          WORKSHOP_CODE.W_LPC5,
          WORKSHOP_CODE.W_LPC8_UGP,
          WORKSHOP_CODE.W_LPC8_UL,
          WORKSHOP_CODE.W_PMP_SOUTH,
          WORKSHOP_CODE.W_PMP_NORTH,
          WORKSHOP_CODE.W_LPC10,
          WORKSHOP_CODE.W_LPC11,
        ],
      },
    ],
  },
  {
    path: '/timesheet',
    label: 'Табель',
    accessRules: [
      {
        professions: [
          PROFESSION_CODE.HEAD,
          PROFESSION_CODE.LEAD_MASTER,
          PROFESSION_CODE.MASTER,
          PROFESSION_CODE.DETAIL_MASTER,
        ],
        workshops: [
          WORKSHOP_CODE.W_LPC4,
          WORKSHOP_CODE.W_LPC5,
          WORKSHOP_CODE.W_LPC8_UGP,
          WORKSHOP_CODE.W_LPC8_UL,
          WORKSHOP_CODE.W_PMP_SOUTH,
          WORKSHOP_CODE.W_PMP_NORTH,
          WORKSHOP_CODE.W_LPC10,
        ],
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
        workshops: [
          WORKSHOP_CODE.W_LPC4,
          WORKSHOP_CODE.W_LPC5,
          WORKSHOP_CODE.W_LPC8_UGP,
          WORKSHOP_CODE.W_LPC8_UL,
          WORKSHOP_CODE.W_PMP_SOUTH,
          WORKSHOP_CODE.W_PMP_NORTH,
          WORKSHOP_CODE.W_LPC10,
          WORKSHOP_CODE.W_LPC11,
        ],
      },
    ],
  },
  {
    path: '/shipment',
    label: 'Отгрузка',
    accessRules: [
      {
        professions: [PROFESSION_CODE.MASTER],
        workshops: [
          WORKSHOP_CODE.W_LPC4,
          WORKSHOP_CODE.W_LPC5,
          WORKSHOP_CODE.W_LPC8_UGP,
          WORKSHOP_CODE.W_LPC8_UL,
          WORKSHOP_CODE.W_PMP_SOUTH,
          WORKSHOP_CODE.W_PMP_NORTH,
          WORKSHOP_CODE.W_LPC10,
          WORKSHOP_CODE.W_LPC11,
        ],
      },
    ],
  },
  {
    path: '/pack',
    label: 'Упаковка',
    accessRules: [
      {
        professions: [PROFESSION_CODE.MASTER],
        workshops: [
          WORKSHOP_CODE.W_LPC4,
          WORKSHOP_CODE.W_LPC5,
          WORKSHOP_CODE.W_LPC8_UGP,
          WORKSHOP_CODE.W_LPC8_UL,
          WORKSHOP_CODE.W_PMP_SOUTH,
          WORKSHOP_CODE.W_PMP_NORTH,
          WORKSHOP_CODE.W_LPC10,
          WORKSHOP_CODE.W_LPC11,
        ],
      },
    ],
  },
  {
    path: '/fix',
    label: 'Раскрепление',
    accessRules: [
      {
        professions: [PROFESSION_CODE.MASTER],
        workshops: [
          WORKSHOP_CODE.W_LPC4,
          WORKSHOP_CODE.W_LPC5,
          WORKSHOP_CODE.W_LPC8_UGP,
          WORKSHOP_CODE.W_LPC8_UL,
          WORKSHOP_CODE.W_PMP_SOUTH,
          WORKSHOP_CODE.W_PMP_NORTH,
          WORKSHOP_CODE.W_LPC10,
          WORKSHOP_CODE.W_LPC11,
        ],
      },
    ],
  },
  {
    path: '/residue',
    label: 'Остаток',
    accessRules: [
      {
        professions: [PROFESSION_CODE.MASTER],
        workshops: [
          WORKSHOP_CODE.W_LPC4,
          WORKSHOP_CODE.W_LPC5,
          WORKSHOP_CODE.W_LPC8_UGP,
          WORKSHOP_CODE.W_LPC8_UL,
          WORKSHOP_CODE.W_PMP_SOUTH,
          WORKSHOP_CODE.W_PMP_NORTH,
          WORKSHOP_CODE.W_LPC10,
          WORKSHOP_CODE.W_LPC11,
        ],
      },
    ],
  },
  {
    path: '/employee',
    label: 'Персонал',
    accessRules: [
      {
        professions: [
          PROFESSION_CODE.LEAD_MASTER,
          PROFESSION_CODE.PRODUCTION_FOREMAN,
        ],
        workshops: [WORKSHOP_CODE.W_LPC10],
      },
      {
        professions: [PROFESSION_CODE.HEAD, PROFESSION_CODE.PRODUCTION_FOREMAN],
        workshops: [
          WORKSHOP_CODE.W_LPC8_UGP,
          WORKSHOP_CODE.W_LPC8_UL,
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
  { value: PROFESSION_CODE.HEAD, label: 'Начальник участка' },
  { value: PROFESSION_CODE.LEAD_MASTER, label: 'Старший мастер' },
  { value: PROFESSION_CODE.MASTER, label: 'Сменный мастер' },
  { value: PROFESSION_CODE.DETAIL_MASTER, label: 'Мастер реквизитов' },
  { value: PROFESSION_CODE.LEAD_OPERATOR, label: 'Старший оператор' },
  { value: PROFESSION_CODE.OPERATOR, label: 'Оператор' },
  { value: PROFESSION_CODE.PRODUCTION_FOREMAN, label: 'Бригадир УОП' },
  { value: PROFESSION_CODE.PACKING_FOREMAN, label: 'Бригадир ОГП' },
  { value: PROFESSION_CODE.PACKER, label: 'Укладчик-упаковщик' },
  { value: PROFESSION_CODE.UNIT_PACKER, label: 'Укладчик-упаковщик ЛУМ' },
  { value: PROFESSION_CODE.PACKER_APR8, label: 'Укладчик-упаковщик АПР-8' },
  { value: PROFESSION_CODE.REPAIR_MECHANIC, label: 'Слесарь' },
  { value: PROFESSION_CODE.STACKER, label: 'Штабелировщик' },
  { value: PROFESSION_CODE.STAMPER, label: 'Штамповщик' },
  { value: PROFESSION_CODE.DRIVER, label: 'Водитель погрузчика' },
  { value: PROFESSION_CODE.CUTTER, label: 'Резчик х/м' },
  { value: PROFESSION_CODE.GAS_CUTTER, label: 'Газорезчик' },
];

export const SCHEDULE_OPTIONS = [
  { value: '', label: 'Не выбрано' },
  { value: SCHEDULE_CODE.S_5B1, label: '5-Б-1' },
  { value: SCHEDULE_CODE.S_2A, label: '2-А' },
  { value: SCHEDULE_CODE.S_9, label: '9' },
  { value: SCHEDULE_CODE.S_2, label: '2' },
];

export const ATTENDANCE_TYPE = {
  Y: 'Я',
  V: 'В',
};

export const ATTENDANCE_OPTIONS = [
  { value: 'БР1', label: 'Бригада №1' },
  { value: 'БР2', label: 'Бригада №2' },
  { value: 'БР3', label: 'Бригада №3' },
  { value: 'БР4', label: 'Бригада №4' },
  { value: 'БР5', label: 'Бригада №5' },

  { value: 'Л4', label: 'ЛПЦ-4' },
  { value: 'Л5', label: 'ЛПЦ-5' },
  { value: 'Л8Г', label: 'ЛПЦ-8 (участок гнутого профиля)' },
  { value: 'Л8Л', label: 'ЛПЦ-8 (участок ленты)' },
  { value: 'Л10', label: 'ЛПЦ-10' },
  { value: 'Л11', label: 'ЛПЦ-11' },
  { value: 'ПМПЮ', label: 'ПМП (южный блок)' },
  { value: 'ПМПС', label: 'ПМП (северный блок)' },

  { value: 'А', label: 'А — Арест или задержания за правонарушения' },
  {
    value: 'Б',
    label:
      'Б — Временная нетрудоспособность и отпуска по уходу за больными, оформленные листками нетрудоспособности',
  },
  {
    value: 'БЖ',
    label: 'БЖ — Освобождение женщины от работы в связи с беременностью',
  },
  {
    value: 'БЖЧ',
    label: 'БЖЧ — Сокращение рабочей смены беременным женщинам (в часах)',
  },
  { value: 'В', label: 'В — Выходные и праздничные дни' },
  { value: 'ВЗ', label: 'ВЗ — Время работы водолаза под водой' },
  {
    value: 'ВП',
    label:
      'ВП — Целые сменные и внутрисменные простои по причинам, не зависящим от работодателя и работника',
  },
  {
    value: 'ВПА',
    label: 'ВПА — Целые сменные и внутрисменные простои по вине работодателя',
  },
  {
    value: 'ВПП',
    label:
      'ВПП — Целосменные и внутресменные простои по причинам, не зависящим от работодателя и работника (более 2/3 тарифа)',
  },
  {
    value: 'ВПР',
    label: 'ВПР — Целые сменные и внутрисменные простои по вине работника',
  },
  { value: 'ГИА', label: 'ГИА — Работа в газоизолирующих аппаратах' },
  {
    value: 'ГС',
    label:
      'ГС — Целодневные невыходы с полным сохранением заработной платы в случаях, предусмотренных законодательством',
  },
  {
    value: 'ГЧ',
    label:
      'ГЧ — Нецелодневные (часовые) невыходы с сохранением заработной платы в случаях, предусмотренных законодательством',
  },
  { value: 'Д', label: 'Д — Донорский день' },
  { value: 'ДД', label: 'ДД — Другой день отдыха' },
  { value: 'ДИ', label: 'ДИ — Нерабочий день с сохранением заработной платы' },
  {
    value: 'ДНД',
    label:
      'ДНД — Дополнительный нерабочий день после дня проведения вакцинации',
  },
  { value: 'ДО', label: 'ДО — Время прохождения диспансеризации' },
  {
    value: 'ДУ',
    label: 'ДУ — Обучение с использованием дистанционных технологий',
  },
  {
    value: 'ЗБ',
    label: 'ЗБ — Массовые неявки - забастовки (разрешенные законом)',
  },
  { value: 'К', label: 'К — Служебные командировки' },
  {
    value: 'КО',
    label:
      'КО — Компенсация за неиспользованные дни ежегодного отпуска при увольнении работника',
  },
  {
    value: 'КОТ',
    label: 'КОТ — Кратковременный целосменный отпуск с последующей отработкой',
  },
  {
    value: 'КОЧ',
    label:
      'КОЧ — Кратковременный нецелосменный отпуск с последующей отработкой',
  },
  { value: 'КУ', label: 'КУ — Направление на обучение' },
  {
    value: 'КУВ',
    label: 'КУВ — Направление на обучение (часовое во время работы)',
  },
  {
    value: 'КУД',
    label: 'КУД — Направление на обучение (дополнительно к часам работы)',
  },
  { value: 'ЛА', label: 'ЛА — Ликвидация аварии' },
  { value: 'М', label: 'М — Перерывы для кормления ребенка' },
  {
    value: 'МО',
    label: 'МО — Медицинский осмотр (обследование) в Диагностическом центре',
  },
  {
    value: 'НБ',
    label:
      'НБ — Целосменные невыходы: отпуска без сохранения заработной платы и неявки по уважительным причинам',
  },
  { value: 'НД', label: 'НД — Нерабочий праздничный день' },
  { value: 'НН', label: 'НН — Неявки по невыясненным причинам' },
  { value: 'НС', label: 'НС — Неотработанные часы' },
  {
    value: 'ОА',
    label:
      'ОА — Отпуск (оплачиваемый частично) по инициативе администрации в связи с простоем в организации',
  },
  {
    value: 'ОД',
    label:
      'ОД — Ежегодный дополнительный отпуск, предусмотренный законодательством и/или коллективным договором',
  },
  { value: 'ОЖ', label: 'ОЖ — Отпуск по уходу за ребенком от 1,5 до 3-х лет' },
  {
    value: 'ОИ',
    label:
      'ОИ — Дополнительные выходные дни работникам, осуществляющим уход за детьми-инвалидами',
  },
  { value: 'ОЛ', label: 'ОЛ — Отпуск для лечения' },
  { value: 'ОП', label: 'ОП — Доп.отпуск для профилактики проф.заболеваний' },
  {
    value: 'ОРС',
    label:
      'ОРС — Целосменное время отстранения от работы работодателем (недопущение к работе)',
  },
  {
    value: 'ОРЧ',
    label:
      'ОРЧ — Часовое время отстранения от работы работодателем (недопущение к работе)',
  },
  { value: 'ОС', label: 'ОС — Отпуск социальный' },
  { value: 'ОТ', label: 'ОТ — Ежегодный основной отпуск' },
  { value: 'ОТД', label: 'ОТД — Отработка кратковременного отпуска' },
  {
    value: 'ОТР',
    label:
      'ОТР — Работа в выходной и/или нерабочий праздничный день с предоставлением другого дня отдыха',
  },
  {
    value: 'ОТЧ',
    label: 'ОТЧ — Часовое время отработки кратковременного отпуска',
  },
  { value: 'ОУ', label: 'ОУ — Отпуск уполномоченным по охране труда' },
  { value: 'ОУТ', label: 'ОУТ — Доп. доплата за особые условия труда' },
  {
    value: 'ОЧ',
    label:
      'ОЧ — Частично оплачиваемый отпуск, предоставляемый по уходу за ребенком до достижения им возраста 1,5 лет',
  },
  {
    value: 'П',
    label: 'П — Время в пути при выполнении работ вахтовым методом',
  },
  { value: 'ПВ', label: 'ПВ — Время вынужденного прогула' },
  { value: 'ПМ', label: 'ПМ — Периодический медицинский осмотр' },
  {
    value: 'ПР',
    label:
      'ПР — Прогулы; неявки на работу без уважительной причины, отсутствие на работе без уважительной причины более четырех часов',
  },
  { value: 'ПТД', label: 'ПТД — Приостановление действия трудового договора' },
  { value: 'ПУ', label: 'ПУ — Опоздание и/или преждевременный уход' },
  { value: 'Р', label: 'Р — Отпуск по беременности и родам' },
  {
    value: 'РДЧ',
    label: 'РДЧ — Длительность перерыва при разделении рабочего дня на части',
  },
  { value: 'РН', label: 'РН — Работа в нерабочие дни' },
  { value: 'С', label: 'С — Сверхурочные часы работы' },
  {
    value: 'СД',
    label:
      'СД — Сокращенный рабочий день для женщин, не берущих частично оплачиваемый отпуск, предоставляемый по уходу за ребенком до достижения им возраста 1,5 лет',
  },
  {
    value: 'СДН',
    label:
      'СДН — Сокращенная рабочая неделя для женщин, не берущих частично оплачиваемый отпуск, предоставляемый по уходу за ребенком до достижения им возраста 1,5 лет',
  },
  { value: 'СИ', label: 'СИ — Самоизоляция' },
  { value: 'СН', label: 'СН — Сокращенная неделя по личному заявлению' },
  { value: 'СЧ', label: 'СЧ — Сокращенный день по личному заявлению' },
  {
    value: 'У',
    label:
      'У — Отпуск в связи с обучением с полным сохранением заработной платы',
  },
  {
    value: 'УД',
    label: 'УД — Отпуск в связи с обучением без сохранения заработной платы',
  },
  {
    value: 'УЧ',
    label:
      'УЧ — Отпуска в связи с обучением с частичным сохранением заработной платы (50%)',
  },
  {
    value: 'ХС',
    label:
      'ХС — Время работы сдельщиков за целые повременные смены (без премии)',
  },
  {
    value: 'ХЧ',
    label: 'ХЧ — Время работы сдельщиков за нецелые повременные смены',
  },
  {
    value: 'ЧИ',
    label: 'ЧИ — Дополнительные часы отдыха для работника-инвалида',
  },
  { value: 'Я', label: 'Я — Часы работы' },
];

export const WORK_PLACES_OPTIONS = [
  { value: '', label: 'Не выбрано' },
  {
    value: 'ЛПЦ-11',
    label: 'ЛПЦ-11',
  },
  {
    value: 'ЛУМ',
    label: 'ЛУМ',
  },
  {
    value: '1 очередь: СТАН-2000',
    label: '1 очередь: СТАН-2000',
  },
  {
    value: '2 очередь: АНГЦ + АНО-ГЦ + АИ',
    label: '2 очередь: АНГЦ + АНО-ГЦ + АИ',
  },
  {
    value: '3 очередь: АНГЦ-3',
    label: '3 очередь: АНГЦ-3',
  },
  {
    value: 'Ж/д тупик 6',
    label: 'Ж/д тупик 6',
  },
  {
    value: 'Ж/д тупик 7',
    label: 'Ж/д тупик 7',
  },
  {
    value: 'Ж/д тупик 8',
    label: 'Ж/д тупик 8',
  },
  {
    value: 'Ж/д тупик 10',
    label: 'Ж/д тупик 10',
  },
  {
    value: 'Производство реквизитов',
    label: 'Производство реквизитов',
  },
  {
    value: 'Документация',
    label: 'Документация',
  },
  {
    value: 'Интвентаризация',
    label: 'Интвентаризация',
  },
  {
    value: 'Обработка данных',
    label: 'Обработка данных',
  },
];
