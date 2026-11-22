import styles from './chart.module.css';

import { Border } from '../border/border';
import { IReportChart } from '../../../utils/api.interfaces';

interface IProps {
  list: IReportChart[];
  emptyLabel: string;
}

export const Chart = ({ list, emptyLabel }: IProps) => {
  // Фиксированная максимальная высота столбца — 300px
  const FIXED_MAX_HEIGHT = 40;

  // Если максимальное значение в данных равно 0, все столбцы будут нулевыми
  const maxDataValue = Math.max(...list.map((item) => item.count)) || 1;

  // Есть ли хоть один ненулевой столбец
  const hasData = list.some((item) => item.count > 0);

  return (
    <ul className={styles.container}>
      {!hasData && <div className={styles.empty}>{emptyLabel}</div>}
      {list.map((item) => {
        // Вычисляем высоту столбца в процентах от 300px
        const percentage = (item.count / maxDataValue) * 100;

        // Переводим процент в пиксели (от 0 до 60)
        const columnHeight = (percentage / 100) * FIXED_MAX_HEIGHT;

        return (
          <li key={item.id} className={styles.item}>
            <span
              style={{ height: `${columnHeight}px` }}
              className={styles.column}
            >
              <span className={styles.count}>
                {item.count > 0 ? item.count : ''}
              </span>
            </span>

            <Border />
            <span className={styles.title}>{item.title}</span>
          </li>
        );
      })}
    </ul>
  );
};
