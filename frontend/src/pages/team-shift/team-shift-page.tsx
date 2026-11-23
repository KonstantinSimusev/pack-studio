import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { formatDayShortMonth } from '../../utils/utils';

import { useDispatch, useSelector } from '../../services/store';
import { getLastShiftWithChartReport } from '../../services/slices/dashboard/actions';
import { downloadExcelReport } from '../../services/slices/excel/actions';

import {
  clearLastShiftWithChartReport,
  selectLastShiftWithChartReport,
} from '../../services/slices/dashboard/slice';

import { BackIcon } from '../../components/ui/icons/back/back';
import { Button } from '../../components/ui/buttons/button/button';
import { Chart } from '../../components/ui/chart/chart';
import { IconButton } from '../../components/ui/buttons/icon-button/icon-button';
import { ReportTable } from '../../components/ui/report-table/report-table';
import { SuccessIcon } from '../../components/ui/icons/success/success';

import styles from './team-shift-page.module.css';

export const TeamShiftPage = () => {
  const { teamNumber } = useParams();
  const navigate = useNavigate();

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
        <BackIcon className={styles.icon} width={24} height={24} />
      </IconButton>

      <main className={styles.main}>
        {list && (
          <>
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

            <div className={styles.tableWrapper}>
              <div className={styles.header}>
                <div className={styles.wrapper}>
                  <span
                    className={styles.workshopName}
                  >{`УУМ ${list.workshopName}`}</span>
                  {list.isReady && <SuccessIcon width={16} height={16} />}
                </div>

                <div className={styles.shift}>
                  <span>{formatDayShortMonth(list.shiftDate)},</span>
                  <span>{`см ${list.shiftCode}`},</span>
                  <span>{`бр ${list.teamNumber}`}</span>
                </div>
              </div>

              {list.packLocations.length > 0 ? (
                <ReportTable
                  title='Ручная упаковка'
                  status='явка'
                  label='Чел'
                  list={list.packLocations}
                />
              ) : (
                <span className={styles.empty}>
                  Ручная упаковка отдыхает...
                </span>
              )}

              {list.lurLocations.length > 0 ? (
                <ReportTable
                  title='Линия упаковки рулонов'
                  status='явка'
                  label='Чел'
                  list={list.lurLocations}
                />
              ) : (
                <span className={styles.empty}>
                  Линия упаковки рулонов отдыхает...
                </span>
              )}

              {list.fixLocations.length > 0 ? (
                <ReportTable
                  title='Раскрепление'
                  status='явка'
                  label='Чел'
                  list={list.fixLocations}
                />
              ) : (
                <span className={styles.empty}>Отгрузка отдыхает...</span>
              )}

              {list.detailLocations.length > 0 ? (
                <ReportTable
                  title='Производство реквизитов'
                  status='явка'
                  label='Чел'
                  list={list.detailLocations}
                />
              ) : (
                <span className={styles.empty}>
                  Производство реквизитов отдыхает...
                </span>
              )}

              {list.professions.length > 0 ? (
                <ReportTable
                  title='Профессия'
                  status='нет на работе'
                  label='Чел'
                  list={list.professions}
                />
              ) : (
                <span className={styles.empty}>Все на работе...</span>
              )}
            </div>

            <Button
              type='button'
              className={styles.downloadButton}
              onClick={() => dispatch(downloadExcelReport(list.shiftId))}
            >
              Скачать рапорт
            </Button>
          </>
        )}
      </main>
    </div>
  );
};
