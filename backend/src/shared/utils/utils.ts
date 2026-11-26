import {
  EProfessionCode,
  EShiftCode,
} from '../enums/enums';

// Ключ даты: строка 'YYYY-MM-DD' без привязки к таймзоне
export const toDateKey = (d: Date | string): string => {
  return typeof d === 'string' ? d : d.toISOString().slice(0, 10);
};

export const toNumber = (value: unknown): number => {
  // 1. Ловим отсутствие данных сразу
  if (value == null) return 0;

  // 2. Работаем со строками
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed === '') return 0; // Пустая строка = 0

    const num = Number(trimmed);
    // isFinite ловит NaN, Infinity. Если не число → 0
    return Number.isFinite(num) ? num : 0;
  }

  // 3. Работаем с числами
  if (typeof value === 'number') {
    // Если число бесконечное или NaN → 0
    return Number.isFinite(value) ? value : 0;
  }

  // 4. Всё остальное (boolean, object) → 0
  return 0;
};

export const toString = (value: unknown): string => {
  if (typeof value !== 'string') {
    return '';
  }
  return value.trim();
};


export const toOptionalString = (value: unknown): string | null => {
  if (value == null) return null;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed === '' ? null : trimmed; // пустая строка → null
  }
  return null; // все остальные типы → null (не undefined!)
};

export const toBoolean = (value: unknown): boolean => {
  if (value == null) return false;

  if (typeof value === 'boolean') return value;

  if (typeof value === 'string') {
    const trimmed = value.trim().toLowerCase();
    if (trimmed === 'true') return true;
    if (trimmed === 'false') return false;
  }

  // Все остальные случаи (числа, объекты и т. д.) → false
  return false;
};

export const getShiftFor2A = (
  teamNumber: number,
): {
  dayOfWeek: number;
  date: Date;
  shiftCode: number | null; // null - выходной
  teamNumber: number;
} => {
  // Сегодня в UTC 00:00
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  // Завтра = сегодня + 1 день
  const tomorrow = new Date(today);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

  // Расписание стартовых дат и смен для бригад в UTC
  const shiftSchedules = [
    {
      teamNumber: 1,
      date: new Date('2026-01-02T00:00:00.000Z'),
    },
    {
      teamNumber: 2,
      date: new Date('2026-01-04T00:00:00.000Z'),
    },
    {
      teamNumber: 3,
      date: new Date('2026-01-05T00:00:00.000Z'),
    },
    {
      teamNumber: 4,
      date: new Date('2026-01-07T00:00:00.000Z'),
    },
  ];

  // Находим запись для указанной бригады
  const teamSchedule = shiftSchedules.find(
    (item) => item.teamNumber === teamNumber,
  );

  const startDate = new Date(teamSchedule.date);
  startDate.setUTCHours(0, 0, 0, 0); // Нормализуем стартовую дату в UTC

  // Разница в миллисекундах между сегодняшней датой и стартовой датой бригады
  const diffMs = tomorrow.getTime() - startDate.getTime();

  // Разница в днях (округляем вниз)
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Количество полных 2‑дневных циклов с момента старта
  const fullCycles = Math.floor(diffDays / 2);

  // Определяем номер смены: чётный цикл — смена 1, нечётный — смена 2
  const shiftNumber = fullCycles % 2 === 0 ? 1 : 2;

  // Рассчитываем дату начала текущей смены в UTC
  const resultDate = new Date(startDate);
  resultDate.setUTCDate(startDate.getUTCDate() + fullCycles * 2);
  resultDate.setUTCHours(0, 0, 0, 0);

  return {
    dayOfWeek: 0, // график 2-А (универсальный, день - 0)
    date: resultDate,
    shiftCode: shiftNumber,
    teamNumber: teamSchedule.teamNumber,
  };
};

export const isRelevantShift = (date: Date, shiftCode: number): boolean => {
  // Вспомогательная функция: гарантированно возвращает дату в формате YYYY-MM-DD в UTC
  const getDateStr = (d: Date | string): string => {
    // pg возвращает колонки типа 'date' уже строкой 'YYYY-MM-DD' — ничего не трогаем
    if (typeof d === 'string') {
      return d.slice(0, 10);
    }
    // Ветки без UTC-сдвига: используем UTC-методы, чтобы не зависеть от таймзоны сервера
    const yyyy = d.getUTCFullYear();
    const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(d.getUTCDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  // Сегодня в UTC 00:00
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  // Завтра = сегодня + 1 день
  const tomorrow = new Date(today);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

  const isFirstShiftTomorrow =
    shiftCode === EShiftCode.NIGHT && getDateStr(date) === getDateStr(tomorrow);

  const isFirstShiftToday =
    shiftCode === EShiftCode.NIGHT && getDateStr(date) === getDateStr(today);

  const isSecondShiftToday =
    shiftCode === EShiftCode.DAY && getDateStr(date) === getDateStr(today);

  return isFirstShiftTomorrow || isFirstShiftToday || isSecondShiftToday;
};

export const hasManager = (professionCode: string): boolean => {
  return [
    EProfessionCode.HEAD,
    EProfessionCode.LEAD_MASTER,
    EProfessionCode.MASTER,
    EProfessionCode.DETAIL_MASTER,
  ].includes(professionCode as EProfessionCode);
};
