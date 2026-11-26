import { Transform } from 'class-transformer';
import { IsInt, Max, MaxLength, Min, MinLength } from 'class-validator';
import { toNumber, toString } from '../../../shared/utils/utils';

export class CreateEmployeeProductDto {
  @Transform(({ value }) => toString(value))
  @MinLength(1, { message: 'Код типа действия обязателен' })
  @MaxLength(20, { message: 'Код не может быть длиннее 20 символов' })
  actionCode: string;

  // Номер плавки — 6 знаков в штрихкоде (дополняется нулями слева)
  @Transform(({ value }) => toNumber(value))
  @IsInt({ message: 'Номер плавки должен быть целым числом' })
  @Min(1, { message: 'Номер плавки должен быть не менее 1' })
  @Max(999999, { message: 'Номер плавки должен быть не более 999999' })
  heatNumber: number;

  // Номер партии — до 7 знаков в штрихкоде (дополняется нулями слева)
  @Transform(({ value }) => toNumber(value))
  @IsInt({ message: 'Номер партии должен быть целым числом' })
  @Min(1, { message: 'Номер партии должен быть не менее 1' })
  @Max(9999999, { message: 'Номер партии должен быть не более 9999999' })
  partyNumber: number;

  // Номер рулона/пачки/листа — до 5 знаков в штрихкоде
  @Transform(({ value }) => toNumber(value))
  @IsInt({ message: 'Номер продукции должен быть целым числом' })
  @Min(1, { message: 'Номер продукции должен быть не менее 1' })
  @Max(99999, { message: 'Номер продукции должен быть не более 99999' })
  productNumber: number;
}
