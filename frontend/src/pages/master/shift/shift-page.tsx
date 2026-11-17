import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { formatDayShortMonth } from '../../../utils/utils';

import { LayerContext } from '../../../contexts/layer/layerContext';

import { useDispatch, useSelector } from '../../../services/store';

import { getShiftById } from '../../../services/slices/shift/actions';
import {
  clearCreateEmployeeShift,
  selectAddedEmployeeShiftId,
} from '../../../services/slices/employee-shift/slice';

import { clearShift, selectShift } from '../../../services/slices/shift/slice';

import { IconButton } from '../../../components/ui/buttons/icon-button/icon-button';
import { EmployeeShiftList } from '../../../components/lists/employee-shift-list/employee-shift-list';

import { AddIcon } from '../../../components/ui/icons/add/add';
import { BackIcon } from '../../../components/ui/icons/back/back';
import { SuccessIcon } from '../../../components/ui/icons/success/success';

import styles from './shift-page.module.css';

export const ShiftPage = () => {
  const {
    setIsOverlayOpen,
    setIsEmployeeAddOpen,
    setSelectedId,
    setSelectedDate,
  } = useContext(LayerContext);

  const { shiftId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const shift = useSelector(selectShift);
  const focusEmployeeShiftId = useSelector(selectAddedEmployeeShiftId);

  useEffect(() => {
    // window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    if (shiftId) {
      dispatch(getShiftById(shiftId));
    }
  }, []);

  // 2. Очистка при уходе со страницы
  useEffect(() => {
    return () => {
      dispatch(clearShift());
      dispatch(clearCreateEmployeeShift());
    };
  }, []);

  const handleBackClick = () => {
    if (shift) {
      setSelectedDate(shift.date);
    }

    navigate(-1);
  };

  const handleAddClick = () => {
    if (shiftId) {
      setSelectedId(shiftId);
    }

    setIsOverlayOpen(true);
    setIsEmployeeAddOpen(true);
  };

  return (
    <>
      {shift !== null && (
        <>
          <div className={styles.actions}>
            <IconButton
              type='button'
              onClick={handleBackClick}
              className={styles.button}
            >
              <BackIcon className={styles.icon} />
            </IconButton>

            <div className={styles.header}>
              <span className={styles.date}>
                {formatDayShortMonth(shift.date)},
              </span>

              <span>{`см ${shift.shiftCode}`},</span>
              <span>{`бр ${shift.teamNumber}`}</span>
            </div>

            <IconButton
              type='button'
              onClick={handleAddClick}
              className={styles.button}
            >
              <AddIcon className={styles.icon} />
            </IconButton>
          </div>

          <div className={styles.stats}>
            <div className={styles.row}>
              <div className={styles.status}>
                <span className={styles.text}>Отмечено работников</span>

                {shift.employeeShifts.every((es) => es.isReady === true) && (
                  <SuccessIcon width={16} height={16} />
                )}
              </div>

              <div className={styles.count}>
                <span>
                  {
                    shift.employeeShifts.filter((es) => es.isReady === true)
                      .length
                  }
                </span>
                <span className={styles.smallText}>из</span>
                <span>{shift.employeeShifts.length}</span>
              </div>
            </div>
          </div>

          <EmployeeShiftList
            employeeShifts={shift.employeeShifts}
            focusId={focusEmployeeShiftId}
          />
        </>
      )}
    </>
  );
};
