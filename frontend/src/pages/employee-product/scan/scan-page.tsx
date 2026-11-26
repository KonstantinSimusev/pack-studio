import type { IDetectedBarcode } from '@yudiel/react-qr-scanner';
import { useContext, useState } from 'react';

import { parseLabel } from '../../../utils/utils';
import { PROFESSION_CODE, TActionCode } from '../../../utils/constants';
import { LayerContext } from '../../../contexts/layer/layerContext';

import { useDispatch, useSelector } from '../../../services/store';
import { selectProfile } from '../../../services/slices/auth/slice';

import { IScanCard } from '../../../utils/api.interfaces';
import { Button } from '../../../components/ui/buttons/button/button';
import { LazyScanner } from '../../../components/scanner/scanner';
import { ScanButton } from '../../../components/ui/buttons/scan-button/scan-button';
import { ScanCardList } from '../../../components/lists/scan-card-list/scan-card-list';
import { ScanCardSummary } from '../../../components/cards/scan-card-summary/scan-card-summary';

import styles from './scan-page.module.css';

import {
  clearCreateEmployeeProductError,
  selectCreateEmployeeProductError,
} from '../../../services/slices/employee-product/slice';
import { createEmployeeProduct } from '../../../services/slices/employee-product/actions';

export const ScanPage = () => {
  const { scanCards, setIsOverlayOpen, setIsScanCardDeleteOpen, setScanCards } =
    useContext(LayerContext);

  const dispatch = useDispatch();
  const serverError = useSelector(selectCreateEmployeeProductError);

  const [scannerOpen, setScannerOpen] = useState(false);
  const [action, setAction] = useState<TActionCode>();

  const profile = useSelector(selectProfile);

  if (!profile) {
    return null; // или <Loader /> / заглушку «Профиль не загружен»
  }

  const handleScan = (actionCode: TActionCode) => {
    dispatch(clearCreateEmployeeProductError());
    setAction(actionCode);
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

  const handleQrScanned = async (codes: IDetectedBarcode[]) => {
    const label = parseLabel(codes[0]?.rawValue ?? '');
    if (!label || !label.productNumber) return;

    const actionCode = action as TActionCode;

    await dispatch(
      createEmployeeProduct({
        actionCode,
        heatNumber: label.heatNumber,
        partyNumber: label.partyNumber,
        productNumber: label.productNumber,
      }),
    ).unwrap();

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

  return (
    <div className={styles.container}>
      {scannerOpen ? (
        <>
          <LazyScanner onScan={handleQrScanned} />

          <div className={styles.message}>
            {serverError && <p className={styles.error}>{serverError}</p>}
          </div>

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
            {profile.professionCode === PROFESSION_CODE.PACKER && (
              <>
                <ScanButton
                  actionCode='pack'
                  label='Упаковка'
                  onAction={() => handleScan('pack')}
                />

                <ScanButton
                  actionCode='fix'
                  label='Припаковка'
                  onAction={() => handleScan('fix')}
                />

                <ScanButton
                  actionCode='repack'
                  label='Переупаковка'
                  onAction={() => handleScan('repack')}
                />
              </>
            )}

            {(profile.professionCode === PROFESSION_CODE.LEAD_OPERATOR ||
              profile.professionCode === PROFESSION_CODE.OPERATOR) && (
              <ScanButton
                actionCode='pack'
                label='Упаковка'
                onAction={() => handleScan('pack')}
              />
            )}

            {profile.professionCode === PROFESSION_CODE.STACKER && (
              <ScanButton
                actionCode='case'
                label='Чехол'
                onAction={() => handleScan('case')}
              />
            )}
          </div>

          <ScanCardSummary cards={scanCards} />
          <ScanCardList cards={scanCards} onDelete={onDelete} />
        </>
      )}
    </div>
  );
};
