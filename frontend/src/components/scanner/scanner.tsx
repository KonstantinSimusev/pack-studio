import { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';

export const QrScannerButton = () => {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<string | undefined>();

  const handleOpen = () => {
    setResult(undefined);
    setOpen(true);
  };

  return (
    <>
      {!open && <button onClick={handleOpen}>Сканировать QR</button>}

      {open && (
        <Scanner
          constraints={{ facingMode: 'environment' }}
          formats={['qr_code']}
          onScan={(codes) => {
            const raw = codes[0]?.rawValue;
            if (!raw) return;

            // Оставляем только цифры (0–9)
            const digitsOnly = raw.replace(/\D/g, '');

            if (digitsOnly) {
              setResult(digitsOnly);
              setOpen(false);
            }
          }}
          onError={(e) => console.error(e?.message)}
        />
      )}

      {result && <p>Результат: {result}</p>}

      {open && <button onClick={() => setOpen(false)}>Закрыть</button>}
    </>
  );
};
