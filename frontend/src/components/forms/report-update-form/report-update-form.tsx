import { useContext, useEffect, useState } from 'react';

import {
  validateField,
  validateForm,
  validationRules,
} from '../../../utils/validation';

import { IUpdateReport } from '../../../utils/api.interfaces';
import { LayerContext } from '../../../contexts/layer/layerContext';

import { useDispatch, useSelector } from '../../../services/store';

import {
  clearUpdateReport,
  selectUpdateReportError,
} from '../../../services/slices/report/slice';

import { updateReport } from '../../../services/slices/report/actions';
import { getLastShiftReports } from '../../../services/slices/shift/actions';
import { selectLastShiftReports } from '../../../services/slices/shift/slice';

import { Button } from '../../ui/buttons/button/button';
import { Form } from '../../ui/form/form';
import { TextInput } from '../../ui/inputs/text-input/text-input';
import { ServerError } from '../../ui/server-error/server-error';

import styles from './report-update-form.module.css';

interface IFormData extends Record<string, string> {
  count: string;
}

export const ReportUpdateForm = () => {
  const {
    isReportUpdateOpen,
    selectedId,
    setIsOverlayOpen,
    setIsReportUpdateOpen,
  } = useContext(LayerContext);

  const dispatch = useDispatch();
  const lastShiftReports = useSelector(selectLastShiftReports);
  const serverError = useSelector(selectUpdateReportError);

  if (!lastShiftReports) {
    return;
  }

  // Находим report по ID
  const report = lastShiftReports.reports.find(
    (report) => report.id === selectedId,
  );

  if (!report) {
    return;
  }

  // Состояние для хранения значений полей формы
  const [formData, setFormData] = useState<IFormData>({
    count: String(report.count),
  });

  // Состояние для хранения ошибок валидации
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    count: '',
  });

  useEffect(() => {
    if (isReportUpdateOpen) {
      dispatch(clearUpdateReport());
    }
  }, [isReportUpdateOpen]);

  // Обработчик изменения поля ввода
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    dispatch(clearUpdateReport());
  };

  // Обработчик потери фокуса для валидации
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
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

    const data: IUpdateReport = {
      id: report.id,
      count: Number(formData.count),
    };

    await dispatch(updateReport(data)).unwrap();
    await dispatch(getLastShiftReports()).unwrap();

    setIsReportUpdateOpen(false);
    setIsOverlayOpen(false);

    setFormData({ count: '' });
    setErrors({ count: '' });
  };

  // Определяем, заблокирована ли кнопка
  const isButtonDisabled =
    Object.values(errors).some(Boolean) || !formData.count;

  return (
    <Form
      title={report.areaName}
      onSubmit={handleSubmit}
      className={styles.container}
    >
      <TextInput
        type='count'
        name='count'
        label='Количество'
        placeholder='123'
        value={formData.count}
        error={errors.count}
        className={styles.input}
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
