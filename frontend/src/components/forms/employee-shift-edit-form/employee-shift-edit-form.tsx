import { useContext, useEffect, useState } from 'react';

import {
  validateField,
  validateForm,
  validationRules,
} from '../../../utils/validation';

import {
  ATTENDANCE_OPTIONS,
  WORK_PLACES_OPTIONS,
  PROFESSION_OPTIONS,
  ATTENDANCE_TYPE,
} from '../../../utils/constants';

import { IUpdateEmployeeShift } from '../../../utils/api.interfaces';
import { LayerContext } from '../../../contexts/layer/layerContext';

import { useDispatch, useSelector } from '../../../services/store';

import { updateEmployeeShift } from '../../../services/slices/employee-shift/actions';
import { getShiftById } from '../../../services/slices/shift/actions';

import {
  clearUpdateEmployeeShift,
  selectUpdateEmployeeShiftError,
} from '../../../services/slices/employee-shift/slice';

import { selectShift } from '../../../services/slices/shift/slice';

import { Button } from '../../ui/buttons/button/button';
import { Form } from '../../ui/form/form';
import { SelectInput } from '../../ui/inputs/select-input/select-input';
import { ServerError } from '../../ui/server-error/server-error';

import styles from './employee-shift-edit-form.module.css';

interface IFormData extends Record<string, string> {
  shiftProfessionCode: string;
  attendanceCode: string;
  workplaceName: string;
}

export const EmployeeShiftEditForm = () => {
  const {
    isEmployeeShiftEditOpen,
    setIsOverlayOpen,
    setIsEmployeeShiftEditOpen,
    selectedId, // это employeeShiftId
  } = useContext(LayerContext);

  const dispatch = useDispatch();
  const shift = useSelector(selectShift);
  const serverError = useSelector(selectUpdateEmployeeShiftError);

  if (!shift) {
    return;
  }

  // Находим employeeShift по ID
  const employeeShift = shift.employeeShifts.find((es) => es.id === selectedId);

  if (!employeeShift) {
    return;
  }

  const employee = employeeShift.employee;

  // Состояние для хранения значений полей формы
  const [formData, setFormData] = useState<IFormData>({
    shiftProfessionCode: employeeShift.shiftProfessionCode,
    attendanceCode: employeeShift.attendanceCode,
    workplaceName: employeeShift.workplaceName ?? '',
  });

  // Состояние для хранения ошибок валидации
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    shiftProfessionCode: '',
    attendanceCode: '',
    workplaceName: '',
  });

  useEffect(() => {
    if (isEmployeeShiftEditOpen) {
      dispatch(clearUpdateEmployeeShift());
    }
  }, [isEmployeeShiftEditOpen]);

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
    dispatch(clearUpdateEmployeeShift());
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
    const data: IUpdateEmployeeShift = {
      id: employeeShift.id,
      shiftProfessionCode: formData.shiftProfessionCode,
      attendanceCode: formData.attendanceCode,
      workplaceName:
        formData.workplaceName === '' ? null : formData.workplaceName,
    };

    try {
      await dispatch(updateEmployeeShift(data)).unwrap();
      await dispatch(getShiftById(shift.id)).unwrap();

      setIsEmployeeShiftEditOpen(false);
      setIsOverlayOpen(false);

      setFormData({
        shiftProfessionCode: '',
        attendanceCode: '',
        workplaceName: '',
      });

      setErrors({
        shiftProfessionCode: '',
        attendanceCode: '',
        workplaceName: '',
      });
    } catch (error) {
      throw new Error('Что-то пошло не так');
    }
  };

  const isButtonDisabled =
    Object.values(errors).some(Boolean) ||
    !formData.shiftProfessionCode ||
    !formData.attendanceCode ||
    (formData.attendanceCode === ATTENDANCE_TYPE.Y &&
      formData.workplaceName === '') ||
    (formData.attendanceCode !== ATTENDANCE_TYPE.Y &&
      formData.workplaceName !== '');

  return (
    <Form
      title={`${employee.lastName} ${employee.firstName} ${employee.patronymic}`}
      onSubmit={handleSubmit}
      className={styles.container}
    >
      <SelectInput
        name='shiftProfessionCode'
        label='Профессия в смене'
        value={formData.shiftProfessionCode}
        options={PROFESSION_OPTIONS}
        className={styles.input}
        error={errors.shiftProfessionCode}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <SelectInput
        name='attendanceCode'
        label='Статус работы'
        value={formData.attendanceCode}
        options={ATTENDANCE_OPTIONS}
        error={errors.attendanceCode}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <SelectInput
        name='workplaceName'
        label='Рабочее место'
        value={formData.workplaceName}
        options={WORK_PLACES_OPTIONS}
        error={errors.workplaceName}
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
        Сохранить
      </Button>
    </Form>
  );
};
