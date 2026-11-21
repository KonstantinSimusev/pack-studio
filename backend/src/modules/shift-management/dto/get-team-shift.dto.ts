import { Transform } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';
import { toNumber } from '../../../shared/utils/utils';

export class GetTeamShiftDto {
  @Transform(({ value }) => toNumber(value))
  @IsInt({ message: 'Номер бригады должен быть целым числом' })
  @Min(1, { message: 'Номер бригады должен быть не менее 1' })
  @Max(4, { message: 'Номер бригады должен быть не более 4' })
  teamNumber: number;
}
