import { IReport } from '../../../utils/api.interfaces';

import { IconButton } from '../../ui/buttons/icon-button/icon-button';
import { EditIcon } from '../../ui/icons/edit/edit';

import styles from './report-card.module.css';

interface IProps {
  report: IReport;
  onClick: () => void;
}

export const ReportCard = ({ report, onClick }: IProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span>{report.areaName}</span>
        <IconButton type='button' onClick={onClick} className={styles.button}>
          <EditIcon width={24} height={24} />
        </IconButton>
      </div>

      <span className={styles.infoBlock}>
        <span className={styles.text}>Количество</span>
        <span className={styles.count}>{report.count}</span>
      </span>
    </div>
  );
};
