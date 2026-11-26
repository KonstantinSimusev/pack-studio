import clsx from 'clsx';

import { SUMMARY_ITEMS_CONFIG, TActionCode } from '../../../utils/constants';
import { IScanCard } from '../../../utils/api.interfaces';

import styles from './scan-card-summary.module.css';

interface IScanCardSummaryProps {
  cards: IScanCard[];
}

export const ScanCardSummary = ({ cards }: IScanCardSummaryProps) => {
  // сводка: сколько упаковано / припаковано / переупаковано
  const counts = cards.reduce(
    (acc, card) => {
      if (card.actionCode in acc) {
        acc[card.actionCode as TActionCode] += 1;
      }
      return acc;
    },
    { pack: 0, fix: 0, repack: 0, case: 0 } as Record<TActionCode, number>,
  );

  const summaryItems = SUMMARY_ITEMS_CONFIG.map((item) => ({
    ...item,
    value: counts[item.actionCode],
  }));

  return (
    <div className={styles.summary}>
      {summaryItems.map(
        (item) =>
          item.value > 0 && (
            <div
              key={item.label}
              className={clsx(
                styles.summaryItem,
                item.actionCode === 'pack' && styles.blue,
                item.actionCode === 'fix' && styles.yellow,
                item.actionCode === 'repack' && styles.red,
                item.actionCode === 'case' && styles.yellow,
              )}
            >
              <span className={styles.label}>{item.label}:</span>
              <span className={styles.summaryValue}>{item.value}</span>
            </div>
          ),
      )}
    </div>
  );
};
