import { ILastShift } from '../../../utils/api.interfaces';
import { formatDateForDayUI } from '../../../utils/utils';

import { SuccessIcon } from '../../ui/icons/success/success';

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
        <div className={styles.wrapper}>
          <span className={styles.date}>{formatDateForDayUI(shift.date)}</span>
          {shift.isReady === true && <SuccessIcon width={16} height={16} />}
        </div>
        
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
