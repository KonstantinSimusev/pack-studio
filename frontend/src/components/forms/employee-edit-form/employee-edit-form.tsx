import { useContext, useEffect, useState } from 'react';

import { IUpdateEmployee } from '../../../utils/api.interfaces';

import {
  PROFESSION_OPTIONS,
  SCHEDULE_OPTIONS,
  TEAM_OPTIONS,
  WORKSHOP_OPTIONS,
} from '../../../utils/constants';

import {
  validateField,
  validateForm,
  validationRules,
} from '../../../utils/validation';

import { useDispatch, useSelector } from '../../../services/store';

import { updateEmployee } from '../../../services/slices/employee/actions';

import {
  clearUpdateEmployeeError,
  selectSearсhEmployee,
  selectUpdateEmployeeError,
} from '../../../services/slices/employee/slice';

import { LayerContext } from '../../../contexts/layer/layerContext';

import { Button } from '../../ui/buttons/button/button';
import { Form } from '../../ui/form/form';
import { ServerError } from '../../ui/server-error/server-error';
import { Switch } from '../../ui/switch/switch';

import { CheckboxInput } from '../../ui/inputs/checkbox-input/checkbox-input';
import { SelectInput } from '../../ui/inputs/select-input/select-input';

import styles from './employee-edit-form.module.css';

interface IFormData extends Record<string, string> {
  currentWorkshopCode: string;
  currentTeamNumber: string;
  currentProfessionCode: string;
  currentScheduleCode: string;

  homeWorkshopCode: string;
  homeTeamNumber: string;
  homeProfessionCode: string;
  homeScheduleCode: string;
}

export const EmployeeEditForm = () => {
  const { isEmployeeEditOpen, setIsOverlayOpen, setIsEmployeeEditOpen } =
    useContext(LayerContext);

  const dispatch = useDispatch();
  const employee = useSelector(selectSearсhEmployee);
  const serverError = useSelector(selectUpdateEmployeeError);

  if (!employee) {
    return null;
  }

  const [isShow, setIsShow] = useState(false);
  const [hasAccess, setHasAccess] = useState(employee.isActive);

  // Состояние для хранения значений полей формы
  const [formData, setFormData] = useState<IFormData>({
    currentWorkshopCode: employee.currentWorkshopCode,
    currentTeamNumber: String(employee.currentTeamNumber),
    currentProfessionCode: employee.currentProfessionCode,
    currentScheduleCode: employee.currentScheduleCode,

    homeWorkshopCode: employee.homeWorkshopCode,
    homeTeamNumber: String(employee.homeTeamNumber),
    homeProfessionCode: employee.homeProfessionCode,
    homeScheduleCode: employee.homeScheduleCode,
  });

  // Состояние для хранения ошибок валидации
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    currentWorkshopCode: '',
    currentTeamNumber: '',
    currentProfessionCode: '',
    currentScheduleCode: '',

    homeWorkshopCode: '',
    homeTeamNumber: '',
    homeProfessionCode: '',
    homeScheduleCode: '',
  });

  useEffect(() => {
    if (isEmployeeEditOpen) {
      dispatch(clearUpdateEmployeeError());
    }
  }, [isEmployeeEditOpen]);

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
    dispatch(clearUpdateEmployeeError());
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

  const handleAccessChange = (checked: boolean) => {
    setHasAccess(checked);

    // Сбрасываем ошибку для этого поля
    setErrors((prev) => ({
      ...prev,
      hasAccess: '',
    }));

    // Очищаем ошибки с сервера
    dispatch(clearUpdateEmployeeError());
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
    const dataForBackend: IUpdateEmployee = {
      id: employee.id,
      isActive: hasAccess,

      currentWorkshopCode: formData.currentWorkshopCode,
      currentTeamNumber: Number(formData.currentTeamNumber),
      currentProfessionCode: formData.currentProfessionCode,
      currentScheduleCode: formData.currentScheduleCode,

      homeWorkshopCode: formData.homeWorkshopCode,
      homeTeamNumber: Number(formData.homeTeamNumber),
      homeProfessionCode: formData.homeProfessionCode,
      homeScheduleCode: formData.homeScheduleCode,
    };

    try {
      await dispatch(updateEmployee(dataForBackend)).unwrap();

      setIsEmployeeEditOpen(false);
      setIsOverlayOpen(false);

      setFormData({
        currentWorkshopCode: '',
        currentTeamNumber: '',
        currentProfessionCode: '',
        currentScheduleCode: '',

        homeWorkshopCode: '',
        homeTeamNumber: '',
        homeProfessionCode: '',
        homeScheduleCode: '',
      });

      setErrors({
        currentWorkshopCode: '',
        currentTeamNumber: '',
        currentProfessionCode: '',
        currentScheduleCode: '',

        homeWorkshopCode: '',
        homeTeamNumber: '',
        homeProfessionCode: '',
        homeScheduleCode: '',
      });
    } catch (error) {
      throw new Error('Что-то пошло не так');
    }
  };

  // Определяем, заблокирована ли кнопка
  const isButtonDisabled =
    Object.values(errors).some(Boolean) ||
    !formData.currentWorkshopCode ||
    !formData.currentTeamNumber ||
    !formData.currentProfessionCode ||
    !formData.currentScheduleCode ||
    !formData.homeWorkshopCode ||
    !formData.homeTeamNumber ||
    !formData.homeProfessionCode ||
    !formData.homeScheduleCode;

  return (
    <Form
      title='Текущее назначение'
      onSubmit={handleSubmit}
      className={styles.container}
    >
      <SelectInput
        name='currentWorkshopCode'
        value={formData.currentWorkshopCode}
        label='Цех'
        options={WORKSHOP_OPTIONS}
        className={styles.input}
        error={errors.currentWorkshopCode}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <SelectInput
        name='currentTeamNumber'
        value={formData.currentTeamNumber}
        label='Бригада №'
        options={TEAM_OPTIONS}
        error={errors.currentTeamNumber}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <SelectInput
        name='currentProfessionCode'
        value={formData.currentProfessionCode}
        label='Профессия'
        options={PROFESSION_OPTIONS}
        error={errors.currentProfessionCode}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <SelectInput
        name='currentScheduleCode'
        value={formData.currentScheduleCode}
        label='График'
        options={SCHEDULE_OPTIONS}
        error={errors.currentScheduleCode}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <Switch
        label='Доступ в личный кабинет'
        checked={hasAccess}
        onChange={handleAccessChange}
        className={styles.switch}
      />

      <CheckboxInput
        text='Внести изменения в КЛС'
        checked={isShow}
        className={styles.input}
        onChange={(e) => setIsShow(e.target.checked)}
      />

      {isShow && (
        <>
          <SelectInput
            name='homeWorkshopCode'
            value={formData.homeWorkshopCode}
            label='Цех'
            options={WORKSHOP_OPTIONS}
            className={styles.input}
            error={errors.homeWorkshopCode}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <SelectInput
            name='homeTeamNumber'
            value={formData.homeTeamNumber}
            label='Бригада №'
            options={TEAM_OPTIONS}
            error={errors.homeTeamNumber}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <SelectInput
            name='homeProfessionCode'
            value={formData.homeProfessionCode}
            label='Профессия'
            options={PROFESSION_OPTIONS}
            error={errors.homeProfessionCode}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <SelectInput
            name='homeScheduleCode'
            value={formData.homeScheduleCode}
            label='График'
            options={SCHEDULE_OPTIONS}
            error={errors.homeScheduleCode}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </>
      )}

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
