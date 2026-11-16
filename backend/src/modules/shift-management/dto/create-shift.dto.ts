import { Transform, Type } from 'class-transformer';
import { IsDate, IsInt, Max, MaxLength, Min, MinLength } from 'class-validator';
import { toNumber, toString } from '../../../shared/utils/utils';

export class CreateShiftDto {
  @Type(() => Date)
  @IsDate({ message: 'Дата смены должна быть валидной датой' })
  date: Date;

  @Transform(({ value }) => toNumber(value))
  @IsInt({ message: 'Код смены должен быть целым числом' })
  @Min(1, { message: 'Код смены должен быть не менее 1' })
  @Max(2, { message: 'Код смены должен быть не более 2' })
  shiftCode: number;
}
