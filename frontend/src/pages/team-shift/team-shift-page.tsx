import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { formatDayShortMonth } from '../../utils/utils';

import { BackIcon } from '../../components/ui/icons/back/back';
import { Chart } from '../../components/ui/chart/chart';
import { IconButton } from '../../components/ui/buttons/icon-button/icon-button';
import { ReportTable } from '../../components/ui/report-table/report-table';

import styles from './team-shift-page.module.css';
import { useDispatch, useSelector } from '../../services/store';
import { getLastShiftWithChartReport } from '../../services/slices/dashboard/actions';
import {
  clearLastShiftWithChartReport,
  selectLastShiftWithChartReport,
} from '../../services/slices/dashboard/slice';

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

export const TeamShiftPage = () => {
  // const {setSelectedId} = useContext(LayerContext);

  const { teamNumber } = useParams();
  const navigate = useNavigate();

  // ВАЖНО!!! Это данные из слайса - сейчас мок - NULL параметр из слайса должен приходить
  const isPack: boolean | null = packLocations.length > 0;
  const isLur: boolean | null = lurLocations.length > 0;
  const isFix: boolean | null = fixLocations.length > 0;
  const hasProfessions: boolean | null = professions.length > 0;

  const dispatch = useDispatch();
  const list = useSelector(selectLastShiftWithChartReport);

  // Обновление данных 1 раз в сутки и приоткрытие вкладки браузера вновь
  useEffect(() => {
    if (teamNumber) {
      dispatch(getLastShiftWithChartReport(Number(teamNumber)));
    }

    // Мгновенное обновление при возврате на вкладку
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        dispatch(getLastShiftWithChartReport(Number(teamNumber)));
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Очистка при уходе со страницы
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      dispatch(clearLastShiftWithChartReport()); // Гарантированно сбросит в null
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

      {list && (
        <div className={styles.chartContainer}>
          <div className={styles.header}>
            <span
              className={styles.workshopName}
            >{`УУМ ${list.workshopName}`}</span>
            <div className={styles.shift}>
              <span>{formatDayShortMonth(list.shiftDate)},</span>
              <span>{`см ${list.shiftCode}`},</span>
              <span>{`бр ${list.teamNumber}`}</span>
            </div>
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
            <span className={styles.title}>Остатки, шт</span>
            <Chart list={list.residue} emptyLabel='Нет остатков' />
          </div>
        </div>
      )}

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
