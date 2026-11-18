import { useEffect } from 'react';

import { formatDayShortMonth } from '../../../utils/utils';
import { REPORT_TYPE_CODE } from '../../../utils/constants';

import { useDispatch, useSelector } from '../../../services/store';
import { getLastShiftReports } from '../../../services/slices/shift/actions';
import {
  clearLastShiftReports,
  selectIsLastShiftReportsLoaded,
  selectLastShiftReports,
} from '../../../services/slices/shift/slice';

import { ReportList } from '../../../components/lists/report-list/report-list';

import styles from './fix-page.module.css';

export const FixPage = () => {
  const dispatch = useDispatch();
  const lastShiftReports = useSelector(selectLastShiftReports);
  const isLastShiftReportsLoaded = useSelector(selectIsLastShiftReportsLoaded);

  // 1. Загрузка данных
  useEffect(() => {
    dispatch(getLastShiftReports());
  }, []);

  // 2. Очистка при уходе со страницы
  useEffect(() => {
    return () => {
      dispatch(clearLastShiftReports()); // Гарантированно сбросит в null
    };
  }, []);

  // Пока не знаем ответ — ничего не решаем (лоадер крутится на уровне App)
  if (!isLastShiftReportsLoaded) {
    return null;
  }

  // Ответ получен, и там null — актуальной смены нет
  if (lastShiftReports === null) {
    return <div className={styles.empty}>Создайте смену</div>;
  }

  const list = lastShiftReports.reports.filter(
    (report) => report.type === REPORT_TYPE_CODE.FIX,
  );

  return (
    <>
      {isLastShiftReportsLoaded && lastShiftReports !== null && (
        <>
          <div className={styles.header}>
            <h1 className={styles.title}>Раскрепление</h1>
            <div className={styles.shiftInfo}>
              <span className={styles.date}>
                {formatDayShortMonth(lastShiftReports.date)},
              </span>
              <span>{`см ${lastShiftReports.shiftCode}`},</span>
              <span>{`бр ${lastShiftReports.teamNumber}`}</span>
            </div>
          </div>

          <ReportList list={list} />
        </>
      )}
    </>
  );
};
