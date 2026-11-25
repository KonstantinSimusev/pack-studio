import {
  useContext,
  // useEffect,
  useState,
} from 'react';

// import { useNavigate } from 'react-router-dom';

import { ICreateManualInput, IScanCard } from '../../../utils/api.interfaces';
import { ACTION_LABELS } from '../../../utils/constants';
import { LayerContext } from '../../../contexts/layer/layerContext';

import {
  validateField,
  validateForm,
  validationRules,
} from '../../../utils/validation';

// import { useDispatch, useSelector } from '../../../services/store';

import { Button } from '../../ui/buttons/button/button';
import { Form } from '../../ui/form/form';
// import { ServerError } from '../../ui/server-error/server-error';
import { TextInput } from '../../ui/inputs/text-input/text-input';

import styles from './manual-input-create-form.module.css';
import { buildQrCode } from '../../../utils/utils';

interface IFormData extends Record<string, string> {
  heatNumber: string;
  partyNumber: string;
  orderNumber: string;
}

export const ManualInputCreateForm = () => {
  // const navigate = useNavigate();

  const {
    selectedActionCode,
    setScanCards,
    setIsManualInputCreateOpen,
    setIsOverlayOpen,
  } = useContext(LayerContext);

  // подпись строго по типам: Record полон, undefined здесь невозможен
  const actionLabel: string = ACTION_LABELS[selectedActionCode];

  // const dispatch = useDispatch();
  // const serverError = useSelector(selectCreateEmployeeError);

  // Состояние для хранения значений полей формы
  const [formData, setFormData] = useState<IFormData>({
    heatNumber: '',
    partyNumber: '',
    orderNumber: '',
  });

  // Состояние для хранения ошибок валидации
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    heatNumber: '',
    partyNumber: '',
    orderNumber: '',
  });

  // useEffect(() => {
  //   if (isEmployeeCreateOpen) {
  //     dispatch(clearCreateEmployeeError());
  //   }
  // }, [isEmployeeCreateOpen]);

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
    // dispatch(clearCreateEmployeeError());
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
    const dataForBackend: ICreateManualInput = {
      actionCode: selectedActionCode,
      heatNumber: formData.heatNumber,
      partyNumber: Number(formData.partyNumber),
      orderNumber: Number(formData.orderNumber),
    };

    try {
      // await dispatch(createEmployee(dataForBackend)).unwrap();

      // navigate('/employee');

      console.log(
        buildQrCode(
          formData.heatNumber,
          dataForBackend.partyNumber,
          dataForBackend.orderNumber,
        ),
      );

      const newCard: IScanCard = {
        id: crypto.randomUUID(),
        ...dataForBackend,
      };

      setScanCards((prev) => [newCard, ...prev]);

      setIsManualInputCreateOpen(false);
      setIsOverlayOpen(false);

      setFormData({
        heatNumber: '',
        partyNumber: '',
        orderNumber: '',
      });

      setErrors({
        heatNumber: '',
        partyNumber: '',
        orderNumber: '',
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
    !formData.orderNumber;

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
        placeholder='A1234567'
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
        placeholder='1234567'
        value={formData.partyNumber}
        error={errors.partyNumber}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <TextInput
        type='text'
        name='orderNumber'
        label='Номер'
        placeholder='123'
        value={formData.orderNumber}
        error={errors.orderNumber}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <div className={styles.message}>
        {/* <ServerError text={serverError} /> */}
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
