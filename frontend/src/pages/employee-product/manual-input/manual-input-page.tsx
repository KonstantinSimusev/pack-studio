import { useContext } from 'react';

import { PROFESSION_CODE, TActionCode } from '../../../utils/constants';
import { LayerContext } from '../../../contexts/layer/layerContext';

import { useSelector } from '../../../services/store';
import { selectProfile } from '../../../services/slices/auth/slice';

import { ScanButton } from '../../../components/ui/buttons/scan-button/scan-button';
import { ScanCardList } from '../../../components/lists/scan-card-list/scan-card-list';
import { ScanCardSummary } from '../../../components/cards/scan-card-summary/scan-card-summary';

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

  const profile = useSelector(selectProfile);

  if (!profile) {
    return null; // или <Loader /> / заглушку «Профиль не загружен»
  }

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

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        {profile.professionCode === PROFESSION_CODE.PACKER && (
          <>
            <ScanButton
              actionCode='pack'
              label='Упаковка'
              onAction={() => handleOpenManualInput('pack')}
            />

            <ScanButton
              actionCode='fix'
              label='Припаковка'
              onAction={() => handleOpenManualInput('fix')}
            />

            <ScanButton
              actionCode='repack'
              label='Переупаковка'
              onAction={() => handleOpenManualInput('repack')}
            />
          </>
        )}

        {(profile.professionCode === PROFESSION_CODE.LEAD_OPERATOR ||
          profile.professionCode === PROFESSION_CODE.OPERATOR) && (
          <ScanButton
            actionCode='pack'
            label='Упаковка'
            onAction={() => handleOpenManualInput('pack')}
          />
        )}

        {profile.professionCode === PROFESSION_CODE.STACKER && (
          <ScanButton
            actionCode='case'
            label='Чехол'
            onAction={() => handleOpenManualInput('case')}
          />
        )}
      </div>

      <ScanCardSummary cards={scanCards} />
      <ScanCardList cards={scanCards} onDelete={onDelete} />
    </div>
  );
};
