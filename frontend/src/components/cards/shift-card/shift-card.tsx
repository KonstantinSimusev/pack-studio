import { ILastShift } from '../../../utils/api.interfaces';
import { formatDateForDayUI } from '../../../utils/utils';

import styles from './shift-card.module.css';

interface IProps {
  shift: ILastShift;
  className?: string;
  onClick?: () => void;
}

export const ShiftCard = ({ shift, onClick }: IProps) => {
  return (
    <div onClick={onClick} className={styles.card}>
      <div className={styles.leftContainer}>
        <span className={styles.date}>{formatDateForDayUI(shift.date)}</span>
        <span className={styles.shift}>{`Смена ${shift.shiftCode}`}</span>
      </div>

      <div className={styles.rightContainer}>
        <div className={styles.raw}>
          <span className={styles.shift}>График</span>
          <span className={styles.shift}>{shift.scheduleName}</span>
        </div>
      </div>
    </div>
  );
};
