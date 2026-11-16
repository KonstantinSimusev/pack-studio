import { useContext, useEffect, useState } from 'react';

import { ICreateShift } from '../../../utils/api.interfaces';
import { LayerContext } from '../../../contexts/layer/layerContext';

// import { toDateString } from '../../../utils/utils';
import { DATE_OPTIONS, SHIFT_CODE_OPTIONS } from '../../../utils/constants';

import {
  validateField,
  validateForm,
  validationRules,
} from '../../../utils/validation';

import { useDispatch, useSelector } from '../../../services/store';
import { selectProfile } from '../../../services/slices/auth/slice';

// import { getShiftsByDate } from '../../../services/slices/shift/actions';

import {
  clearCreateShiftError,
  selectCreateShiftError,
} from '../../../services/slices/shift/slice';

import { Button } from '../../ui/buttons/button/button';
import { Form } from '../../ui/form/form';
import { ServerError } from '../../ui/server-error/server-error';
import { SelectInput } from '../../ui/inputs/select-input/select-input';

import styles from './shift-create-form.module.css';
import {
  createShift,
  getLastShift,
} from '../../../services/slices/shift/actions';

interface IFormData extends Record<string, string> {
  date: string;
  shiftCode: string;
}

export const ShiftCreateForm = () => {
  const dispatch = useDispatch();
  const serverError = useSelector(selectCreateShiftError);

  const profile = useSelector(selectProfile);

  const {
    isShiftCreateOpen,
    setIsOverlayOpen,
    setIsShiftCreateOpen,
    // setSelectedDate,
  } = useContext(LayerContext);

  // Состояние для хранения значений полей формы
  const [formData, setFormData] = useState<IFormData>({
    date: '',
    shiftCode: '',
  });

  // Состояние для хранения ошибок валидации
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    shiftDate: '',
  });

  useEffect(() => {
    if (isShiftCreateOpen) {
      dispatch(clearCreateShiftError());
    }
  }, [isShiftCreateOpen]);

  // Обработчик изменения поля ввода
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    // Обновляем данные формы
    setFormData({
      ...formData,
      [name]: value,
    });

    // Сбрасываем ошибку при начале ввода
    setErrors({
      ...errors,
      [name]: '',
    });

    // Очищаем ошибки с сервера
    dispatch(clearCreateShiftError());
  };

  // Обработчик потери фокуса для валидации
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    // Получаем ошибку валидации для поля
    const validationError = validateField(name, value, validationRules);

    // Обновляем состояние ошибок
    setErrors({
      ...errors,
      [name]: validationError || '',
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Валидируем всю форму
    const formErrors = validateForm(formData, validationRules);

    // Сохраняем все ошибки в состояние
    setErrors(formErrors);

    // Если форма невалидна, выход
    if (Object.keys(formErrors).length > 0) {
      return;
    }

    if (!profile) {
      return null;
    }

    const data: ICreateShift = {
      date: formData.date,
      shiftCode: Number(formData.shiftCode),
    };

    await dispatch(createShift(data)).unwrap();
    await dispatch(getLastShift()).unwrap();

    setIsShiftCreateOpen(false);
    setIsOverlayOpen(false);

    setFormData({ date: '', shiftCode: '' });
    setErrors({ date: '', shiftCode: '' });
  };

  // Определяем, заблокирована ли кнопка
  const isButtonDisabled =
    Object.values(errors).some(Boolean) ||
    !formData.date ||
    !formData.shiftCode;

  return (
    <Form
      title='Новая смена'
      onSubmit={handleSubmit}
      className={styles.container}
    >
      <SelectInput
        name='date'
        value={formData.date}
        label='Дата'
        options={DATE_OPTIONS}
        className={styles.input}
        error={errors.date}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <SelectInput
        name='shiftCode'
        value={formData.shiftCode}
        label='Смена'
        options={SHIFT_CODE_OPTIONS}
        error={errors.shiftCode}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <div className={styles.message}>
        <ServerError text={serverError} />
      </div>

      <Button
        type='submit'
        disabled={isButtonDisabled}
        className={styles.button}
      >
        Создать
      </Button>
    </Form>
  );
};
