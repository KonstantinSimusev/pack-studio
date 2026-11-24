import { useState } from 'react';
import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner';

import { Button } from '../../../components/ui/buttons/button/button';

import styles from './scan-page.module.css';

type ActionType = 'pack' | 'fix' | 'repack';

const ACTION_LABELS: Record<ActionType, string> = {
  pack: 'Упаковка',
  fix: 'Припаковка',
  repack: 'Переупаковка',
};

export const ScanPage = () => {
  const [scannerOpen, setScannerOpen] = useState(false);
  const [action, setAction] = useState<ActionType>();
  const [result, setResult] = useState<string>();

  const handleScan = (type: ActionType) => {
    setAction(type);
    setResult(undefined);
    setScannerOpen(true);
  };

  const handleResult = (value: string) => {
    setResult(value);
    setScannerOpen(false);
  };

  const handleQrScanned = (codes: IDetectedBarcode[]) => {
    const raw = codes[0]?.rawValue;
    if (!raw) return;

    const numberCode = raw.replace(/\D/g, '');
    if (numberCode) {
      handleResult(numberCode);
    }
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
            onClick={() => setScannerOpen(false)}
          >
            Закрыть
          </Button>
        </>
      ) : (
        <>
          <div className={styles.buttons}>
            <Button type='button' onClick={() => handleScan('pack')}>
              Упаковка
            </Button>
            <Button type='button' onClick={() => handleScan('fix')}>
              Припаковка
            </Button>
            <Button type='button' onClick={() => handleScan('repack')}>
              Переупаковка
            </Button>
          </div>

          {result && action && (
            <div className={styles.result}>
              <p>
                {ACTION_LABELS[action]}: {result}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
