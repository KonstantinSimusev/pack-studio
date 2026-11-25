import { useContext } from 'react';
import clsx from 'clsx';

import { SUMMARY_ITEMS_CONFIG, TActionCode } from '../../../utils/constants';
import { LayerContext } from '../../../contexts/layer/layerContext';

import { Button } from '../../../components/ui/buttons/button/button';
import { ScanCard } from '../../../components/cards/scan-card/scan-card';

import styles from './manual-input-page.module.css';

export const ManualInputPage = () => {
  const {
    scanCards,
    setIsOverlayOpen,
    setIsScanCardDeleteOpen,
    setIsManualInputCreateOpen,
    setSelectedActionCode,
    setScanCards,
  } = useContext(LayerContext);

  // один метод для всех трёх кнопок: открывает overlay и модалку с формой
  const handleOpenManualInput = (actionCode: TActionCode) => {
    setSelectedActionCode(actionCode);
    setIsOverlayOpen(true);
    setIsManualInputCreateOpen(true);
  };

  const onDelete = (id: string) => {
    // if (shiftId) {
    //   setSelectedId(shiftId);
    // }

    // Сюда диспатч + бекенд запрос
    setScanCards((prev) => prev.filter((card) => card.id !== id));

    setIsOverlayOpen(true);
    setIsScanCardDeleteOpen(true);
  };

  // сводка: сколько упаковано / приковано / переупаковано
  const counts = scanCards.reduce(
    (acc, card) => {
      if (card.actionCode in acc) {
        acc[card.actionCode as TActionCode] += 1;
      }
      return acc;
    },
    { pack: 0, fix: 0, repack: 0 } as Record<TActionCode, number>,
  );

  const summaryItems = SUMMARY_ITEMS_CONFIG.map((item) => ({
    ...item,
    value: counts[item.actionCode],
  }));

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <Button
          type='button'
          className={styles.packButton}
          onClick={() => handleOpenManualInput('pack')}
        >
          Упаковка
        </Button>

        <Button
          type='button'
          className={styles.fixButton}
          onClick={() => handleOpenManualInput('fix')}
        >
          Припаковка
        </Button>

        <Button
          type='button'
          className={styles.repackButton}
          onClick={() => handleOpenManualInput('repack')}
        >
          Переупаковка
        </Button>
      </div>

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
                )}
              >
                <span className={styles.label}>{item.label}:</span>
                <span className={styles.summaryValue}>{item.value}</span>
              </div>
            ),
        )}
      </div>

      <ul className={styles.cardList}>
        {scanCards.map((card, index) => (
          <li key={card.id} className={styles.cardItem}>
            <ScanCard
              index={scanCards.length - index}
              card={card}
              onDelete={() => onDelete(card.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
