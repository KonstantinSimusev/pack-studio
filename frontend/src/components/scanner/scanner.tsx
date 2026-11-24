import { Scanner } from '@yudiel/react-qr-scanner';

type Props = {
  onScanResult: (value: string) => void;
  onClose?: () => void;
};

export const QrScannerButton = ({ onScanResult, onClose }: Props) => {
  return (
    <>
      <Scanner
        constraints={{ facingMode: 'environment' }}
        formats={['qr_code']}
        onScan={(codes) => {
          const raw = codes[0]?.rawValue;
          if (!raw) return;

          const digitsOnly = raw.replace(/\D/g, '');
          if (digitsOnly) {
            onScanResult(digitsOnly);
          }
        }}
        onError={(e) => console.error(e?.message)}
      />
      <button onClick={onClose}>Закрыть</button>
    </>
  );
};
