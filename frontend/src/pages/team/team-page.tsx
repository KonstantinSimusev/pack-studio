import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { BackIcon } from '../../components/ui/icons/back/back';
import { IconButton } from '../../components/ui/buttons/icon-button/icon-button';

import styles from './team-page.module.css';
import { Chart } from '../../components/ui/chart/chart';
import { formatDayShortMonth } from '../../utils/utils';
import { ReportTable } from '../../components/ui/report-table/report-table';
// import { ProductionChart } from '../../components/charts/production-chart/production-chart';

// мок — ручная упаковка
const packLocations: { name: string; count: number }[] = [
  { name: '1 очередь', count: 0 },
  { name: '2 очередь', count: 4 },
  { name: '3 очередь', count: 3 },
];

// мок — ЛУР
const lurLocations: { name: string; count: number }[] = [
  { name: 'Пост управления', count: 3 },
  { name: 'Упаковка', count: 4 },
];

// мок — раскрепление
const fixLocations: { name: string; count: number }[] = [
  { name: 'Ж/д тупик № 7', count: 3 },
  { name: 'Ж/д тупик № 10', count: 2 },
];

// мок — профессия отсутствие на работе
const professions: {
  name: string;
  reason: string;
  count: number;
}[] = [
  {
    name: 'Укладчик-упаковщик ЛУР',
    reason: 'Б',
    count: 1,
  },
  {
    name: 'Штабелировщик металла',
    reason: 'НБ',
    count: 3,
  },
  {
    name: 'Резчик холодного металла',
    reason: 'ОТ',
    count: 1,
  },
  {
    name: 'Мастер участка реквизитов',
    reason: 'Д',
    count: 1,
  },
];

const list = {
  production: [
    {
      id: '1',
      title: 'СТАН',
      count: 0,
    },
    {
      id: '2',
      title: 'АНГЦ',
      count: 85,
    },
    {
      id: '3',
      title: 'АНО',
      count: 34,
    },
    {
      id: '4',
      title: 'АИ',
      count: 13,
    },
    {
      id: '5',
      title: 'АНГЦ-3',
      count: 110,
    },
  ],
  shipment: [
    {
      id: '1',
      title: 'Туп 6',
      count: 2,
    },
    {
      id: '2',
      title: 'Туп 7',
      count: 21,
    },
    {
      id: '3',
      title: 'Туп 8',
      count: 0,
    },
    {
      id: '4',
      title: 'Туп 10',
      count: 10,
    },
  ],
  pack: [
    {
      id: '1',
      title: 'ЛУР',
      count: 100,
    },
    {
      id: '2',
      title: '1 оч',
      count: 0,
    },
    {
      id: '3',
      title: '2 оч',
      count: 73,
    },
    {
      id: '4',
      title: '3 оч',
      count: 113,
    },
  ],
  residue: [
    {
      id: '2',
      title: '1 оч',
      count: 0,
    },
    {
      id: '3',
      title: '2 оч',
      count: 0,
    },
    {
      id: '4',
      title: '3 оч',
      count: 0,
    },
  ],
};

// const residueCount = 0;

export const TeamPage = () => {
  // const {setSelectedId} = useContext(LayerContext);

  const { teamId } = useParams();
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const shift = useSelector(selectShift);
  // const focusEmployeeShiftId = useSelector(selectAddedEmployeeShiftId);

  // ВАЖНО!!! Это данные из слайса - сейчас мок - NULL параметр из слайса должен приходить
  const isPack: boolean | null = packLocations.length > 0;
  const isLur: boolean | null = lurLocations.length > 0;
  const isFix: boolean | null = fixLocations.length > 0;
  const hasProfessions: boolean | null = professions.length > 0;

  useEffect(() => {
    if (teamId) {
      // dispatch(getShiftById(shiftId));
    }
  }, []);

  // 2. Очистка при уходе со страницы
  useEffect(() => {
    return () => {
      // dispatch(clearShift());
      // dispatch(clearCreateEmployeeShift());
    };
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <IconButton
        type='button'
        onClick={handleBackClick}
        className={styles.button}
      >
        <BackIcon className={styles.icon} />
      </IconButton>

      <div className={styles.chartContainer}>
        <div className={styles.header}>
          <span>{formatDayShortMonth(new Date())},</span>
          <span>{`см ${1}`},</span>
          <span>{`бр ${3}`}</span>
        </div>

        <div className={styles.chart}>
          <span className={styles.title}>Производство, шт</span>
          <Chart list={list.production} emptyLabel='Нет производства' />
        </div>

        <div className={styles.chart}>
          <span className={styles.title}>Отгрузка, ваг</span>
          <Chart list={list.shipment} emptyLabel='Нет отгрузки' />
        </div>

        <div className={styles.chart}>
          <span className={styles.title}>Упаковка, шт</span>
          <Chart list={list.pack} emptyLabel='Нет упаковки' />
        </div>

        <div className={styles.chart}>
          <span className={styles.title}>Остаток, шт</span>
          <Chart list={list.residue} emptyLabel='Нет остатка' />
        </div>
      </div>

      <div className={styles.tableWrapper}>
        {isPack ? (
          <ReportTable
            title='Ручная упаковка'
            label='Чел'
            list={packLocations}
          />
        ) : (
          <span className={styles.empty}>Ручная упаковка отдыхает...</span>
        )}

        {isLur ? (
          <ReportTable
            title='Линия упаковки рулонов'
            label='Чел'
            list={lurLocations}
          />
        ) : (
          <span className={styles.empty}>
            Линия упаковки рулонов отдыхает...
          </span>
        )}

        {isFix ? (
          <ReportTable title='Раскрепление' label='Чел' list={fixLocations} />
        ) : (
          <span className={styles.empty}>Отгрузка отдыхает...</span>
        )}

        {hasProfessions ? (
          <ReportTable title='Профессия' label='Чел' list={professions} />
        ) : (
          <span className={styles.empty}>Все на работе...</span>
        )}
      </div>
    </div>
  );
};
