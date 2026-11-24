import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner';
import { useContext, useState } from 'react';
import clsx from 'clsx';

import { LayerContext } from '../../../contexts/layer/layerContext';

import { IScanCard } from '../../../utils/api.interfaces';
import { Button } from '../../../components/ui/buttons/button/button';
import { ScanCard } from '../../../components/cards/scan-card/scan-card';

import styles from './scan-page.module.css';

type ActionType = 'pack' | 'fix' | 'repack';

const HEAT_LENGTH = 10;
const PARTY_LENGTH = 10;

// Из строки ярлыка оставляем только цифры и режем: 6 — плавка, 6 — партия, остаток — номер
const parseLabel = (raw: string) => {
  const digits = raw.replace(/\D/g, '');

  return {
    heatNumber: digits.slice(0, HEAT_LENGTH),
    partyNumber: Number(digits.slice(HEAT_LENGTH, HEAT_LENGTH + PARTY_LENGTH)),
    orderNumber: Number(digits.slice(HEAT_LENGTH + PARTY_LENGTH)),
  };
};

export const ScanPage = () => {
  const {
    setIsOverlayOpen,
    setIsScanCardDeleteOpen,
    // setSelectedId,
  } = useContext(LayerContext);

  const [scannerOpen, setScannerOpen] = useState(false);
  const [action, setAction] = useState<ActionType>();
  const [cards, setCards] = useState<IScanCard[]>([]);

  const handleScan = (type: ActionType) => {
    setAction(type);
    setScannerOpen(true);
  };

  const handleCloseScanner = () => setScannerOpen(false);

  const addCard = (
    label: ReturnType<typeof parseLabel>,
    actionCode: ActionType,
  ) => {
    const newCard: IScanCard = {
      id: crypto.randomUUID(),
      ...label,
      actionCode,
    };

    setCards((prev) => [newCard, ...prev]);
  };

  const handleQrScanned = (codes: IDetectedBarcode[]) => {
    const raw = codes[0]?.rawValue;
    if (!raw) return;

    const label = parseLabel(raw);

    // защита от кривого скана: плавка и партия должны собраться полностью
    if (
      label.heatNumber.length !== HEAT_LENGTH ||
      Number.isNaN(label.partyNumber) ||
      !label.orderNumber
    ) {
      return;
    }

    addCard(label, action ?? 'pack');
    handleCloseScanner();
  };

  const onDelete = (id: string) => {
    // if (shiftId) {
    //   setSelectedId(shiftId);
    // }

    // Сюда диспатч + бекенд запрос
    setCards((prev) => prev.filter((card) => card.id !== id));

    setIsOverlayOpen(true);
    setIsScanCardDeleteOpen(true);
  };

  // сводка: сколько упаковано / приковано / переупаковано
  const counts = cards.reduce(
    (acc, card) => {
      if (card.actionCode in acc) {
        acc[card.actionCode as ActionType] += 1;
      }
      return acc;
    },
    { pack: 0, fix: 0, repack: 0 } as Record<ActionType, number>,
  );

  const summaryItems: Array<{
    label: string;
    value: number;
    actionCode: ActionType;
  }> = [
    { label: 'Упаковано', value: counts.pack, actionCode: 'pack' },
    { label: 'Припаковано', value: counts.fix, actionCode: 'fix' },
    { label: 'Переупаковано', value: counts.repack, actionCode: 'repack' },
  ];

  return (
    <div className={styles.container}>
      {scannerOpen ? (
        <>
          <Scanner
            constraints={{ facingMode: 'environment' }}
            formats={['qr_code']}
            onScan={handleQrScanned}
          />
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
            {cards.map((card, index) => (
              <li key={card.id} className={styles.cardItem}>
                <ScanCard
                  index={cards.length - index}
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
