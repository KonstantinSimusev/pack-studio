import { getCount } from '../../../utils/utils';
import { Border } from '../border/border';
import styles from './report-table.module.css';

interface IItem {
  name: string;
  reason?: string;
  count: number;
}

interface IProps {
  title: string;
  label: string;
  list: IItem[];
}

export const ReportTable = ({ title, label, list }: IProps) => {
  const total = getCount(list);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <span className={styles.label}>{label}</span>
      </div>
      <Border />
      <ul className={styles.list}>
        {list.map((item, index) => (
          <li className={styles.item} key={index}>
            <span className={styles.text}>{item.name}</span>

            <div className={styles.wrapper}>
              {item.reason && (
                <span className={styles.reason}>{item.reason}</span>
              )}
              <span className={styles.count}>{item.count}</span>
            </div>
          </li>
        ))}
      </ul>
      <Border />
      <div className={styles.footer}>
        <span>Всего:</span>
        <span className={styles.total}>{total}</span>
      </div>
    </section>
  );
};
