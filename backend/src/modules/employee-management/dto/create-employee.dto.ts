import { Transform } from 'class-transformer';
import { IsInt, Max, MaxLength, Min, MinLength } from 'class-validator';
import { toNumber, toString } from '../../../shared/utils/utils';

export class CreateEmployeeDto {
  @Transform(({ value }) => toString(value))
  @MinLength(2, { message: 'Фамилия должна быть от 2 символов' })
  @MaxLength(50, { message: 'Фамилия не может превышать 50 символов' })
  lastName: string;

  @Transform(({ value }) => toString(value))
  @MinLength(2, { message: 'Имя должно быть от 2 символов' })
  @MaxLength(50, { message: 'Имя не может превышать 50 символов' })
  firstName: string;

  @Transform(({ value }) => toString(value))
  @MinLength(2, { message: 'Отчество должно быть от 2 символов' })
  @MaxLength(50, { message: 'Отчество не может превышать 50 символов' })
  patronymic: string;

  @Transform(({ value }) => toNumber(value))
  @IsInt({ message: 'Личный номер должен быть целым числом' })
  @Min(1, { message: 'Личный номер должен быть не менее 1' })
  @Max(999999999, { message: 'Личный номер должен быть не более 999999999' })
  personalNumber: number;

  @Transform(({ value }) => toString(value))
  @MinLength(1, { message: 'Код цеха обязателен' })
  @MaxLength(20, { message: 'Код цеха не может быть длиннее 20 символов' })
  workshopCode: string;

  @Transform(({ value }) => toNumber(value))
  @IsInt({ message: 'Номер бригады должен быть целым числом' })
  @Min(1, { message: 'Номер бригады должен быть не менее 1' })
  @Max(5, { message: 'Номер бригады должен быть не более 5' })
  teamNumber: number;

  @Transform(({ value }) => toString(value))
  @MinLength(1, { message: 'Код профессии обязателен' })
  @MaxLength(100, { message: 'Код не может быть длиннее 100 символов' })
  professionCode: string;

  @Transform(({ value }) => toString(value))
  @MinLength(1, { message: 'Код графика обязателен' })
  @MaxLength(20, { message: 'Код графика не может быть длиннее 20 символов' })
  scheduleCode: string;
}
