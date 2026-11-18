import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsUUID, Max, Min } from 'class-validator';

import { toNumber } from '../../../shared/utils/utils';

export class UpdateReportDto {
  @IsNotEmpty({ message: 'ID смены сотрудника не может быть пустым' })
  @IsUUID('4', { message: 'ID должен быть корректным UUID v4' })
  id: string;

  @Transform(({ value }) => toNumber(value))
  @IsInt({ message: 'Количество должно быть целым числом' })
  @Min(0, { message: 'Количество должно быть не менее 0' })
  @Max(999, { message: 'Количество должно быть не более 999' })
  count: number;
}
