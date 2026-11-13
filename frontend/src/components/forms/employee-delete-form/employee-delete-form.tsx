import { useContext, useEffect } from 'react';

import { LayerContext } from '../../../contexts/layer/layerContext';
import { useDispatch, useSelector } from '../../../services/store';
import { deleteEmployee } from '../../../services/slices/employee/actions';

import {
  clearDeleteEmployeeError,
  clearEmployeeInfo,
  selectDeleteEmployeeError,
} from '../../../services/slices/employee/slice';

import { Button } from '../../ui/buttons/button/button';
import { Form } from '../../ui/form/form';
import { ServerError } from '../../ui/server-error/server-error';

import styles from './employee-delete-form.module.css';

export const EmployeeDeleteForm = () => {
  const {
    selectedId,
    isEmployeeDeleteOpen,
    setIsOverlayOpen,
    setIsEmployeeDeleteOpen,
  } = useContext(LayerContext);

  const dispatch = useDispatch();
  const serverError = useSelector(selectDeleteEmployeeError);

  useEffect(() => {
    if (isEmployeeDeleteOpen) {
      dispatch(clearDeleteEmployeeError());
    }
  }, [isEmployeeDeleteOpen]);

  const handleDeleteClick = async () => {
    await dispatch(deleteEmployee(selectedId)).unwrap();
    dispatch(clearEmployeeInfo());

    setIsOverlayOpen(false);
    setIsEmployeeDeleteOpen(false);
  };

  const handleReturnClick = () => {
    setIsOverlayOpen(false);
    setIsEmployeeDeleteOpen(false);
  };

  return (
    <Form title='Удалить работника?' className={styles.title}>
      <div className={styles.message}>{<ServerError text={serverError} />}</div>

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
