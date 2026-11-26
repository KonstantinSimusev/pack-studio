import { useContext, useEffect, useState } from 'react';

import { ACTION_LABELS } from '../../../utils/constants';
import { ICreateEmployeeProduct } from '../../../utils/api.interfaces';

import {
  validateField,
  validateForm,
  validationRules,
} from '../../../utils/validation';

import { LayerContext } from '../../../contexts/layer/layerContext';

import { useDispatch, useSelector } from '../../../services/store';
import { createEmployeeProduct } from '../../../services/slices/employee-product/actions';

import {
  clearCreateEmployeeProductError,
  selectCreateEmployeeProductError,
} from '../../../services/slices/employee-product/slice';

import { Button } from '../../ui/buttons/button/button';
import { Form } from '../../ui/form/form';
import { ServerError } from '../../ui/server-error/server-error';
import { TextInput } from '../../ui/inputs/text-input/text-input';

import styles from './manual-input-create-form.module.css';

interface IFormData extends Record<string, string> {
  heatNumber: string;
  partyNumber: string;
  productNumber: string;
}

export const ManualInputCreateForm = () => {
  const {
    isManualInputCreateOpen,
    selectedActionCode,
    setIsManualInputCreateOpen,
    setIsOverlayOpen,
  } = useContext(LayerContext);

  // подпись строго по типам: Record полон, undefined здесь невозможен
  const actionLabel: string = ACTION_LABELS[selectedActionCode];

  const dispatch = useDispatch();
  const serverError = useSelector(selectCreateEmployeeProductError);

  // Состояние для хранения значений полей формы
  const [formData, setFormData] = useState<IFormData>({
    heatNumber: '',
    partyNumber: '',
    productNumber: '',
  });

  // Состояние для хранения ошибок валидации
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    heatNumber: '',
    partyNumber: '',
    productNumber: '',
  });

  useEffect(() => {
    if (isManualInputCreateOpen) {
      dispatch(clearCreateEmployeeProductError());
    }
  }, [isManualInputCreateOpen]);

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
    dispatch(clearCreateEmployeeProductError());
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

    // Преобразование данных перед отправкой
    const data: ICreateEmployeeProduct = {
      actionCode: selectedActionCode,
      heatNumber: Number(formData.heatNumber),
      partyNumber: Number(formData.partyNumber),
      productNumber: Number(formData.productNumber),
    };

    try {
      await dispatch(createEmployeeProduct(data)).unwrap();

      setIsManualInputCreateOpen(false);
      setIsOverlayOpen(false);

      setFormData({
        heatNumber: '',
        partyNumber: '',
        productNumber: '',
      });

      setErrors({
        heatNumber: '',
        partyNumber: '',
        productNumber: '',
      });
    } catch (error) {
      throw new Error('Что-то пошло не так');
    }
  };

  // Определяем, заблокирована ли кнопка
  const isButtonDisabled =
    Object.values(errors).some(Boolean) ||
    !formData.heatNumber ||
    !formData.partyNumber ||
    !formData.productNumber;

  return (
    <Form
      title={actionLabel}
      className={styles.container}
      onSubmit={handleSubmit}
    >
      <TextInput
        type='text'
        name='heatNumber'
        label='Плавка'
        placeholder='123456'
        value={formData.heatNumber}
        error={errors.heatNumber}
        className={styles.input}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <TextInput
        type='text'
        name='partyNumber'
        label='Партия'
        placeholder='123'
        value={formData.partyNumber}
        error={errors.partyNumber}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <TextInput
        type='text'
        name='productNumber'
        label='Номер'
        placeholder='123'
        value={formData.productNumber}
        error={errors.productNumber}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <div className={styles.message}>
        <ServerError text={serverError} />
      </div>

      <Button
        type='submit'
        disabled={isButtonDisabled}
        className={styles.button}
      >
        Сохранить
      </Button>
    </Form>
  );
};
