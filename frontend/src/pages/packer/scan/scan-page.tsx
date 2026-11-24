import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner';
import { useState } from 'react';

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
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

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
