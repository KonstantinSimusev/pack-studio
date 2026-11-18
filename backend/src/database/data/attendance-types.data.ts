import { IAttendanceType } from '../../shared/interfaces/api.interface';

export const attendanceTypes: IAttendanceType[] = [
  // Бригады
  { attendanceCode: 'БР1', description: 'Бригада №1' },
  { attendanceCode: 'БР2', description: 'Бригада №2' },
  { attendanceCode: 'БР3', description: 'Бригада №3' },
  { attendanceCode: 'БР4', description: 'Бригада №4' },
  { attendanceCode: 'БР5', description: 'Бригада №5' },

  // Подразделения
  { attendanceCode: 'Л4', description: 'ЛПЦ-4' },
  { attendanceCode: 'Л5', description: 'ЛПЦ-5' },
  { attendanceCode: 'Л8Г', description: 'ЛПЦ-8 (участок гнутого профиля)' },
  { attendanceCode: 'Л8Л', description: 'ЛПЦ-8 (участок ленты)' },
  { attendanceCode: 'Л10', description: 'ЛПЦ-10' },
  { attendanceCode: 'Л11', description: 'ЛПЦ-11' },
  { attendanceCode: 'ПМПЮ', description: 'ПМП (южный блок)' },
  { attendanceCode: 'ПМПС', description: 'ПМП (северный блок)' },

  // Отсутствия и состояния
  {
    attendanceCode: 'А',
    description: 'Арест или задержания за правонарушения',
  },
  {
    attendanceCode: 'Б',
    description:
      'Временная нетрудоспособность и отпуска по уходу за больными, оформленные листками нетрудоспособности',
  },
  { attendanceCode: 'В', description: 'Выходные и праздничные дни' },
  { attendanceCode: 'Д', description: 'Донорский день' },
  { attendanceCode: 'К', description: 'Служебные командировки' },
  { attendanceCode: 'КУ', description: 'Направление на обучение' },
  {
    attendanceCode: 'НБ',
    description:
      'Целосменные невыходы: отпуска без сохранения заработной платы и неявки по уважительным причинам',
  },
  { attendanceCode: 'НД', description: 'Нерабочий праздничный день' },
  { attendanceCode: 'НН', description: 'Неявки по невыясненным причинам' },
  {
    attendanceCode: 'ОЖ',
    description: 'Отпуск по уходу за ребенком от 1,5 до 3-х лет',
  },
  {
    attendanceCode: 'ОИ',
    description:
      'Дополнительные выходные дни работникам, осуществляющим уход за детьми-инвалидами',
  },
  { attendanceCode: 'ОС', description: 'Отпуск социальный' },
  { attendanceCode: 'ОТ', description: 'Ежегодный основной отпуск' },
  {
    attendanceCode: 'ПМ',
    description: 'Периодический медицинский осмотр',
  },
  {
    attendanceCode: 'ПР',
    description:
      'Прогулы; неявки на работу без уважительной причины, отсутствие на работе без уважительной причины более четырех часов',
  },
  {
    attendanceCode: 'ПТД',
    description: 'Приостановление действия трудового договора',
  },
  { attendanceCode: 'Я', description: 'Часы работы' },
];
