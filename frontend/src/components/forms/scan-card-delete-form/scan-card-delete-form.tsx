import { useContext, useEffect } from 'react';

import { LayerContext } from '../../../contexts/layer/layerContext';
// import { useDispatch, useSelector } from '../../../services/store';

// import { deleteEmployeeShift } from '../../../services/slices/employee-shift/actions';
// import { getShiftById } from '../../../services/slices/shift/actions';

// import { selectShift } from '../../../services/slices/shift/slice';

// import {
//   clearDeleteEmployeeShift,
//   selectDeleteEmployeeShiftError,
// } from '../../../services/slices/employee-shift/slice';

import { Button } from '../../ui/buttons/button/button';
import { Form } from '../../ui/form/form';
// import { ServerError } from '../../ui/server-error/server-error';

import styles from './scan-card-delete-form.module.css';

export const ScanCardDeleteForm = () => {
  const {
    // selectedId,
    isScanCardDeleteOpen,
    setIsOverlayOpen,
    setIsScanCardDeleteOpen,
  } = useContext(LayerContext);

  // const dispatch = useDispatch();
  // const shift = useSelector(selectShift);
  // const serverError = useSelector(selectDeleteEmployeeShiftError);

  useEffect(() => {
    if (isScanCardDeleteOpen) {
      // dispatch(clearDeleteEmployeeShift());
    }
  }, [isScanCardDeleteOpen]);

  const handleDeleteClick = async () => {
    // if (shift) {
    //   await dispatch(deleteEmployeeShift(selectedId)).unwrap();

    //   await dispatch(getShiftById(shift.id)).unwrap();
    // }

    // Очищаем состояние оверлеев и модальных окон
    setIsOverlayOpen(false);
    setIsScanCardDeleteOpen(false);
  };

  const handleReturnClick = () => {
    setIsOverlayOpen(false);
    setIsScanCardDeleteOpen(false);
  };

  return (
    <Form title='Удалить рулон?' className={styles.title}>
      <div className={styles.message}>
        {/* <ServerError text={serverError} /> */}
      </div>

      <div className={styles.buttons__wrapper}>
        <Button
          type='button'
          onClick={handleDeleteClick}
          className={styles.button__ok}
        >
          Да
        </Button>

        <Button
          type='button'
          onClick={handleReturnClick}
          className={styles.button__return}
        >
          Отменить
        </Button>
      </div>
    </Form>
  );
};
