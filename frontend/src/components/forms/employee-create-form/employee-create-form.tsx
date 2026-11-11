import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  PROFESSION_OPTIONS,
  SCHEDULE_OPTIONS,
  TEAM_OPTIONS,
  WORKSHOP_OPTIONS,
} from '../../../utils/constants';

import { ICreateEmployee } from '../../../utils/api.interfaces';

import {
  validateField,
  validateForm,
  validationRules,
} from '../../../utils/validation';

import { useDispatch, useSelector } from '../../../services/store';

import { createEmployee } from '../../../services/slices/employee/actions';

import {
  clearCreateEmployeeError,
  selectCreateEmployeeError,
} from '../../../services/slices/employee/slice';

import { LayerContext } from '../../../contexts/layer/layerContext';

import { Button } from '../../ui/buttons/button/button';
import { Form } from '../../ui/form/form';
import { ServerError } from '../../ui/server-error/server-error';
import { SelectInput } from '../../ui/inputs/select-input/select-input';
import { TextInput } from '../../ui/inputs/text-input/text-input';

import styles from './employee-create-form.module.css';

interface IFormData extends Record<string, string> {
  lastName: string;
  firstName: string;
  patronymic: string;
  personalNumber: string;
  workshopCode: string;
  teamNumber: string;
  professionCode: string;
  scheduleCode: string;
}

export const EmployeeCreateForm = () => {
  const navigate = useNavigate();

  const {
    isEmployeeCreateOpen,
    setIsEmployeeCreateOpen,
    setIsAccountInfoOpen,
  } = useContext(LayerContext);

  const dispatch = useDispatch();
  const serverError = useSelector(selectCreateEmployeeError);

  // Состояние для хранения значений полей формы
  const [formData, setFormData] = useState<IFormData>({
    lastName: '',
    firstName: '',
    patronymic: '',
    personalNumber: '',
    workshopCode: '',
    teamNumber: '',
    professionCode: '',
    scheduleCode: '',
  });

  // Состояние для хранения ошибок валидации
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    lastName: '',
    firstName: '',
    patronymic: '',
    personalNumber: '',
    workshopCode: '',
    teamNumber: '',
    professionCode: '',
    scheduleCode: '',
  });

  useEffect(() => {
    if (isEmployeeCreateOpen) {
      dispatch(clearCreateEmployeeError());
    }
  }, [isEmployeeCreateOpen]);

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
    dispatch(clearCreateEmployeeError());
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
    const dataForBackend: ICreateEmployee = {
      lastName: formData.lastName,
      firstName: formData.firstName,
      patronymic: formData.patronymic,
      personalNumber: Number(formData.personalNumber),
      workshopCode: formData.workshopCode,
      teamNumber: Number(formData.teamNumber),
      professionCode: formData.professionCode,
      scheduleCode: formData.scheduleCode,
    };

    try {
      await dispatch(createEmployee(dataForBackend)).unwrap();

      navigate('/employee');

      setIsEmployeeCreateOpen(false);
      setIsAccountInfoOpen(true);

      setFormData({
        lastName: '',
        firstName: '',
        patronymic: '',
        personalNumber: '',
        workshopCode: '',
        teamNumber: '',
        professionCode: '',
        scheduleCode: '',
      });

      setErrors({
        lastName: '',
        firstName: '',
        patronymic: '',
        personalNumber: '',
        workshopCode: '',
        teamNumber: '',
        professionCode: '',
        scheduleCode: '',
      });
    } catch (error) {
      throw new Error('Что-то пошло не так');
    }
  };

  // Определяем, заблокирована ли кнопка
  const isButtonDisabled =
    Object.values(errors).some(Boolean) ||
    !formData.lastName ||
    !formData.firstName ||
    !formData.patronymic ||
    !formData.personalNumber ||
    !formData.workshopCode ||
    !formData.teamNumber ||
    !formData.professionCode ||
    !formData.scheduleCode;

  return (
    <Form
      title='Новый работник'
      className={styles.container}
      onSubmit={handleSubmit}
    >
      <TextInput
        type='text'
        name='lastName'
        label='Фамилия'
        placeholder='Иванов'
        value={formData.lastName}
        error={errors.lastName}
        className={styles.input}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <TextInput
        type='text'
        name='firstName'
        placeholder='Иван'
        label='Имя'
        value={formData.firstName}
        error={errors.firstName}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <TextInput
        type='text'
        name='patronymic'
        label='Отчество'
        placeholder='Иванович'
        value={formData.patronymic}
        error={errors.patronymic}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <TextInput
        type='text'
        name='personalNumber'
        label='Личный №'
        placeholder='12345'
        value={formData.personalNumber}
        error={errors.personalNumber}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <SelectInput
        name='workshopCode'
        label='Цех №'
        value={formData.workshopCode}
        options={WORKSHOP_OPTIONS}
        error={errors.workshopCode}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <SelectInput
        name='teamNumber'
        label='Бригада №'
        value={formData.teamNumber}
        options={TEAM_OPTIONS}
        error={errors.teamNumber}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <SelectInput
        name='professionCode'
        label='Профессия'
        value={formData.professionCode}
        options={PROFESSION_OPTIONS}
        error={errors.professionCode}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <SelectInput
        name='scheduleCode'
        label='График'
        value={formData.scheduleCode}
        options={SCHEDULE_OPTIONS}
        error={errors.scheduleCode}
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
