import { Transform, Type } from 'class-transformer';

import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
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

  @Transform(({ value }) => toNumber(value))
  @IsInt({ message: 'Номер бригады должен быть целым числом' })
  @Min(1, { message: 'Номер бригады должен быть не менее 1' })
  @Max(5, { message: 'Номер бригады должен быть не более 5' })
  profileTeamNumber: number;

  @Transform(({ value }) => toNumber(value))
  @IsInt({ message: 'Штатная позиция должна быть целым числом' })
  @Min(1, { message: 'Штатная позиция должна быть не менее 1' })
  @Max(999999999, { message: 'Штатная позиция должна быть не более 999999999' })
  profilePositionCode: number;

  @Transform(({ value }) => toBoolean(value))
  @IsBoolean({ message: 'Доступ должен быть true или false' })
  hasAccess: boolean;

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

  @Transform(({ value }) => toNumber(value))
  @IsInt({ message: 'Номер бригады должен быть целым числом' })
  @Min(1, { message: 'Номер бригады должен быть не менее 1' })
  @Max(5, { message: 'Номер бригады должен быть не более 5' })
  teamNumber: number;

  @Transform(({ value }) => toNumber(value))
  @IsInt({ message: 'Штатная позиция должна быть целым числом' })
  @Min(1, { message: 'Штатная позиция должна быть не менее 1' })
  @Max(999999999, { message: 'Штатная позиция должна быть не более 999999999' })
  positionCode: number;

  @Type(() => Date)
  @IsDate({ message: 'Дата рождения должна быть валидной датой' })
  birthDay: Date;

  @Type(() => Date)
  @IsDate({ message: 'Дата рождения должна быть валидной датой' })
  startDate: Date;

  @Type(() => Date)
  @IsOptional()
  @IsDate({ message: 'Дата увольнения должна быть валидной датой' })
  endDate: Date | null;
}
