import { Transform, Type } from 'class-transformer';

import {
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

import {
  //   toNumber,
  //   toOptionalBoolean,
  //   toOptionalNumber,
  toOptionalString,
  toString,
} from '../../../shared/utils/utils';

export class UpdateEmployeeShiftDto {
  @IsNotEmpty({ message: 'ID смены сотрудника не может быть пустым' })
  @IsUUID('4', { message: 'ID должен быть корректным UUID v4' })
  id: string;

  @Transform(({ value }) => toString(value))
  @MinLength(1, { message: 'Код профессии обязателен' })
  @MaxLength(100, { message: 'Код не может быть длиннее 100 символов' })
  shiftProfessionCode: string;

  @Transform(({ value }) => toString(value))
  @MinLength(1, { message: 'Код посещения не может быть пустым' })
  @MaxLength(10, { message: 'Код посещения не должен превышать 10 символов' })
  attendanceCode: string;

  @Transform(({ value }) => toOptionalString(value))
  @IsOptional()
  workplaceName: string | null;
}
