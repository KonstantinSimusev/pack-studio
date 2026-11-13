import { Transform } from 'class-transformer';

import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

import { toBoolean, toNumber, toString } from '../../../shared/utils/utils';

export class UpdateEmployeeDto {
  @IsNotEmpty({ message: 'ID сотрудника не может быть пустым' })
  @IsUUID('4', { message: 'ID должен быть корректным UUID v4' })
  id: string;

  @Transform(({ value }) => toBoolean(value))
  @IsBoolean({ message: 'Доступ должен быть true или false' })
  hasAccess: boolean;

  @Transform(({ value }) => toString(value))
  @MinLength(1, { message: 'Код цеха обязателен' })
  @MaxLength(20, { message: 'Код цеха не может быть длиннее 20 символов' })
  currentWorkshopCode: string;

  @Transform(({ value }) => toNumber(value))
  @IsInt({ message: 'Номер бригады должен быть целым числом' })
  @Min(1, { message: 'Номер бригады должен быть не менее 1' })
  @Max(5, { message: 'Номер бригады должен быть не более 5' })
  currentTeamNumber: number;

  @Transform(({ value }) => toString(value))
  @MinLength(1, { message: 'Код профессии обязателен' })
  @MaxLength(100, { message: 'Код не может быть длиннее 100 символов' })
  currentProfessionCode: string;

  @Transform(({ value }) => toString(value))
  @MinLength(1, { message: 'Код графика обязателен' })
  @MaxLength(20, { message: 'Код графика не может быть длиннее 20 символов' })
  currentScheduleCode: string;

  @Transform(({ value }) => toString(value))
  @MinLength(1, { message: 'Код цеха обязателен' })
  @MaxLength(20, { message: 'Код цеха не может быть длиннее 20 символов' })
  homeWorkshopCode: string;

  @Transform(({ value }) => toNumber(value))
  @IsInt({ message: 'Номер бригады должен быть целым числом' })
  @Min(1, { message: 'Номер бригады должен быть не менее 1' })
  @Max(5, { message: 'Номер бригады должен быть не более 5' })
  homeTeamNumber: number;

  @Transform(({ value }) => toString(value))
  @MinLength(1, { message: 'Код профессии обязателен' })
  @MaxLength(100, { message: 'Код не может быть длиннее 100 символов' })
  homeProfessionCode: string;

  @Transform(({ value }) => toString(value))
  @MinLength(1, { message: 'Код графика обязателен' })
  @MaxLength(20, { message: 'Код графика не может быть длиннее 20 символов' })
  homeScheduleCode: string;
}
