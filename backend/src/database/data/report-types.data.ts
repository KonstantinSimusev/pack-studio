import { IReportType } from '../../shared/interfaces/api.interface';

export const reportTypes: IReportType[] = [
  { typeCode: '001_production', name: 'Производство', unit: 'шт' },
  { typeCode: '002_pack', name: 'Упаковка', unit: 'шт' },
  { typeCode: '003_shipment', name: 'Отгрузка', unit: 'ваг' },
  { typeCode: '004_residue', name: 'Остатки', unit: 'шт' },
];
