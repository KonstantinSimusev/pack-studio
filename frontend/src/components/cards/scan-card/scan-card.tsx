import clsx from 'clsx';

import { IScanCard } from '../../../utils/api.interfaces';
import { IconButton } from '../../ui/buttons/icon-button/icon-button';
import { DeleteIcon } from '../../ui/icons/delete/delete';

import styles from './scan-card.module.css';

interface IProps {
  index: number;
  card: IScanCard;
  className?: string;
  onDelete: () => void;
}

export const ScanCard = ({ index, card, onDelete }: IProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.topContainer}>
        <div className={styles.header}>
          <span
            className={clsx(
              styles.index,
              card.actionCode === 'pack' && styles.blue,
              card.actionCode === 'fix' && styles.yellow,
              card.actionCode === 'repack' && styles.red,
            )}
          >
            № {index}
          </span>
        </div>

        <IconButton type='button' onClick={onDelete} className={styles.button}>
          <DeleteIcon width={24} height={24} />
        </IconButton>
      </div>

      <div className={styles.info}>
        <div className={styles.row}>
          <span className={styles.title}>Плавка</span>
          <span className={styles.text}>{card.heatNumber}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.title}>Партия</span>
          <span className={styles.text}>{card.partyNumber}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.title}>Номер</span>
          <span className={styles.text}>{card.orderNumber}</span>
        </div>
      </div>
    </div>
  );
};
