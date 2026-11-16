import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { LayerContext } from '../../../contexts/layer/layerContext';
import { useDispatch, useSelector } from '../../../services/store';

import { getLastShift } from '../../../services/slices/shift/actions';

import { selectProfile } from '../../../services/slices/auth/slice';
import {
  clearLastShift,
  selectIsLastShiftLoaded,
  selectLastShift,
} from '../../../services/slices/shift/slice';

import { Button } from '../../../components/ui/buttons/button/button';
import { InfoBlock } from '../../../components/ui/info-block/info-block';
import { ShiftCard } from '../../../components/cards/shift-card/shift-card';

import styles from './timesheet-page.module.css';

export const TimesheetPage = () => {
  const { setIsOverlayOpen, setIsShiftCreateOpen, setSelectedId } =
    useContext(LayerContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profile = useSelector(selectProfile);
  const lastShift = useSelector(selectLastShift);
  const isLastShiftLoaded = useSelector(selectIsLastShiftLoaded);

  // 1. Загрузка данных
  useEffect(() => {
    dispatch(getLastShift());
  }, []);

  // 2. Очистка при уходе со страницы
  useEffect(() => {
    return () => {
      dispatch(clearLastShift()); // Гарантированно сбросит в null
    };
  }, []);

  const handleClick = (shiftId: string) => {
    setSelectedId(shiftId);
    navigate(`/timesheet/${shiftId}`);
  };

  const createShift = () => {
    setIsOverlayOpen(true);
    setIsShiftCreateOpen(true);
  };

  // Проверка профиля — только после хуков!
  if (profile === null) {
    return null;
  }

  return (
    <>
      <div className={styles.manager}>
        <InfoBlock
          title='Структурное подразделение'
          text={`УУМ ${profile.workshopName}`}
        />
        <InfoBlock title='№ бригады' text={`${profile.teamNumber}`} />
        <InfoBlock
          title='Руководитель'
          text={`${profile.lastName} ${profile.firstName} ${profile.patronymic}`}
        />
        <InfoBlock title='Должность' text={profile.professionName} />
      </div>

      {/* Ни кнопки, ни карточки, пока ответ не пришёл */}
      {isLastShiftLoaded && lastShift !== null && (
        <ShiftCard
          shift={lastShift}
          onClick={() => handleClick(lastShift.id)}
        />
      )}

      {isLastShiftLoaded && lastShift === null && (
        <div className={styles.buttonWrapper}>
          <Button type='button' onClick={createShift}>
            Создать смену
          </Button>
        </div>
      )}
    </>
  );
};
