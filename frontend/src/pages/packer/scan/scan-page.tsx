import type { IDetectedBarcode } from '@yudiel/react-qr-scanner';
import { useContext, useState } from 'react';
import clsx from 'clsx';

import { parseLabel } from '../../../utils/utils';
import { SUMMARY_ITEMS_CONFIG, TActionCode } from '../../../utils/constants';
import { LayerContext } from '../../../contexts/layer/layerContext';

import { IScanCard } from '../../../utils/api.interfaces';
import { Button } from '../../../components/ui/buttons/button/button';
import { LazyScanner } from '../../../components/scanner/scanner';
import { ScanCard } from '../../../components/cards/scan-card/scan-card';

import styles from './scan-page.module.css';

export const ScanPage = () => {
  const { scanCards, setIsOverlayOpen, setIsScanCardDeleteOpen, setScanCards } =
    useContext(LayerContext);

  const [scannerOpen, setScannerOpen] = useState(false);
  const [action, setAction] = useState<TActionCode>();

  const handleScan = (type: TActionCode) => {
    setAction(type);
    setScannerOpen(true);
  };

  const handleCloseScanner = () => setScannerOpen(false);

  const addCard = (
    label: NonNullable<ReturnType<typeof parseLabel>>,
    actionCode: TActionCode,
  ) => {
    const newCard: IScanCard = {
      id: crypto.randomUUID(),
      ...label,
      actionCode,
    };

    setScanCards((prev) => [newCard, ...prev]);
  };

  const handleQrScanned = (codes: IDetectedBarcode[]) => {
    const label = parseLabel(codes[0]?.rawValue ?? '');
    if (!label || !label.orderNumber) return;

    addCard(label, action ?? 'pack');
    handleCloseScanner();
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
      {scannerOpen ? (
        <>
          <LazyScanner onScan={handleQrScanned} />
          <Button
            type='button'
            className={styles.button}
            onClick={handleCloseScanner}
          >
            Закрыть
          </Button>
        </>
      ) : (
        <>
          <div className={styles.buttons}>
            <Button
              type='button'
              className={styles.packButton}
              onClick={() => handleScan('pack')}
            >
              Упаковка
            </Button>

            <Button
              type='button'
              className={styles.fixButton}
              onClick={() => handleScan('fix')}
            >
              Припаковка
            </Button>

            <Button
              type='button'
              className={styles.repackButton}
              onClick={() => handleScan('repack')}
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
        </>
      )}
    </div>
  );
};
