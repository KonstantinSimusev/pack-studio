import { lazy, Suspense } from 'react';
import type { IDetectedBarcode } from '@yudiel/react-qr-scanner';

const Scanner = lazy(() =>
  import('@yudiel/react-qr-scanner').then((m) => ({ default: m.Scanner })),
);

interface ILazyScannerProps {
  onScan: (codes: IDetectedBarcode[]) => void;
}

export const LazyScanner = ({ onScan }: ILazyScannerProps) => (
  <Suspense fallback={<p>Загрузка сканера…</p>}>
    <Scanner
      constraints={{ facingMode: 'environment' }}
      formats={['qr_code']}
      onScan={onScan}
    />
  </Suspense>
);
