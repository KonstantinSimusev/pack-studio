import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PROFESSION_CODE } from '../../../utils/constants';

import {
  validateField,
  validateForm,
  validationRules,
} from '../../../utils/validation';

import { LayerContext } from '../../../contexts/layer/layerContext';

import { useDispatch, useSelector } from '../../../services/store';

import {
  loginEmployee,
  logoutEmployee,
} from '../../../services/slices/auth/actions';

import {
  clearAuthError,
  selectAuthError,
} from '../../../services/slices/auth/slice';

import { Button } from '../../ui/buttons/button/button';
import { Form } from '../../ui/form/form';
import { TextInput } from '../../ui/inputs/text-input/text-input';
import { ServerError } from '../../ui/server-error/server-error';

import styles from './login-form.module.css';

interface IFormData extends Record<string, string> {
  login: string;
  password: string;
}

export const LoginForm = () => {
  const { isLoginOpen, setIsOverlayOpen, setIsLoginOpen } =
    useContext(LayerContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const serverError = useSelector(selectAuthError);

  // Состояние для хранения значений полей формы
  const [formData, setFormData] = useState<IFormData>({
    login: '',
    password: '',
  });

  // Состояние для хранения ошибок валидации
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    login: '',
    password: '',
  });

  useEffect(() => {
    if (isLoginOpen) {
      dispatch(clearAuthError());
    }
  }, [isLoginOpen]);

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
    dispatch(clearAuthError());
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

    try {
      const employee = await dispatch(loginEmployee(formData)).unwrap();

      switch (employee.professionCode) {
        // Укладчики и операторы — на сканирование
        case PROFESSION_CODE.LEAD_OPERATOR:
        case PROFESSION_CODE.OPERATOR:
        case PROFESSION_CODE.PACKER:
        case PROFESSION_CODE.STACKER:
          navigate('/scan');
          break;

        // Руководящий состав — на главную
        case PROFESSION_CODE.MANAGER:
        case PROFESSION_CODE.HEAD:
        case PROFESSION_CODE.LEAD_MASTER:
        case PROFESSION_CODE.MASTER:
        case PROFESSION_CODE.DETAIL_MASTER:
        case PROFESSION_CODE.PRODUCTION_FOREMAN:
          navigate('/home');
          break;

        // Остальные профессии
        // ВАЖНО!!! нужен выход из аакаунта
        // Сейчас не разаработано
        default:
          dispatch(logoutEmployee());
      }

      setIsLoginOpen(false);
      setIsOverlayOpen(false);

      setFormData({ login: '', password: '' });
      setErrors({ login: '', password: '' });
    } catch (error) {
      throw new Error();
    }
  };

  // Определяем, заблокирована ли кнопка
  const isButtonDisabled =
    Object.values(errors).some(Boolean) ||
    !formData.login ||
    !formData.password;

  return (
    <Form title='Авторизация' onSubmit={handleSubmit}>
      <TextInput
        type='text'
        name='login'
        label='Логин'
        value={formData.login}
        error={errors.login}
        onChange={handleChange}
        onBlur={handleBlur}
        className={styles.input}
      />

      <TextInput
        type='password'
        name='password'
        label='Пароль'
        value={formData.password}
        error={errors.password}
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
        Войти
      </Button>
    </Form>
  );
};
