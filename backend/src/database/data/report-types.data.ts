import { IReportType } from '../../shared/interfaces/api.interface';

export const reportTypes: IReportType[] = [
  { typeCode: 'production', name: 'Производство' },
  { typeCode: 'shipment', name: 'Отгрузка' },
  { typeCode: 'pack', name: 'Упаковка' },
  { typeCode: 'fix', name: 'Раскрепление' },
  { typeCode: 'residue', name: 'Остаток' },
];
