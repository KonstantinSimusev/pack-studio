import { useEffect } from 'react';

import { useDispatch, useSelector } from '../../services/store';
import { formatDateForDayUI } from '../../utils/utils';

import { getAbsenceSummary } from '../../services/slices/dashboard/actions';

import {
  clearAbsenceSummary,
  selectAbsenceSummary,
} from '../../services/slices/dashboard/slice';

import { ReportTable } from '../ui/report-table/report-table';

import styles from './absence-board.module.css';

export const AbsenceBoard = () => {
  const dispatch = useDispatch();
  const absences = useSelector(selectAbsenceSummary);

  useEffect(() => {
    dispatch(getAbsenceSummary());
  }, []);

  // Очистка при уходе со страницы
  useEffect(() => {
    return () => {
      dispatch(clearAbsenceSummary()); // Гарантированно сбросит в null
    };
  }, []);

  if (absences === null) return;

  const total = absences.reduce((total, item) => total + item.count, 0);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Временная нетрудоспособность</h3>
        <span className={styles.location}>УУМ ЛПЦ-11</span>

        <span className={styles.status}>
          <span className={styles.text}>Обновлено:</span>
          <span className={styles.date}>{formatDateForDayUI(new Date())}</span>
        </span>
      </div>

      {total > 0 ? (
        <ReportTable title='Профессия' label='Чел' list={absences} />
      ) : (
        <span className={styles.empty}>Все здоровые...</span>
      )}
    </section>
  );
};
