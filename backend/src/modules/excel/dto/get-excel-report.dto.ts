import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetExcelReportDto {
  @IsNotEmpty({ message: 'ID сотрудника не может быть пустым' })
  @IsUUID('4', { message: 'ID должен быть корректным UUID v4' })
  shiftId: string;
}
