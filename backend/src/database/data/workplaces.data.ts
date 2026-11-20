import { IWorkplaceData } from '../../shared/interfaces/api.interface';

export const workplaces: IWorkplaceData[] = [
  // Руководство ЛПЦ-11
  { name: 'ЛПЦ-11', workshopCode: 'W_LPC11', professionCode: 'HEAD' },
  { name: 'ЛПЦ-11', workshopCode: 'W_LPC11', professionCode: 'MASTER' },
  {
    name: 'ЛПЦ-11',
    workshopCode: 'W_LPC11',
    professionCode: 'DETAIL_MASTER',
  },

  // ЛУМ
  { name: 'Линия упаковки рулонов', workshopCode: 'W_LPC11', professionCode: 'PACKER_LUR' },
  { name: 'Линия упаковки рулонов', workshopCode: 'W_LPC11', professionCode: 'LEAD_OPERATOR' },
  { name: 'Линия упаковки рулонов', workshopCode: 'W_LPC11', professionCode: 'OPERATOR' },

  // Очереди упаковки
  {
    name: '1 очередь: СТАН-2000',
    workshopCode: 'W_LPC11',
    professionCode: 'PACKER',
  },
  {
    name: '2 очередь: АНГЦ + АНО-ГЦ + АИ',
    workshopCode: 'W_LPC11',
    professionCode: 'PACKER',
  },
  {
    name: '3 очередь: АНГЦ-3',
    workshopCode: 'W_LPC11',
    professionCode: 'PACKER',
  },

  // Ж/д тупики
  { name: 'Ж/д тупик № 6', workshopCode: 'W_LPC11', professionCode: 'STACKER' },
  { name: 'Ж/д тупик № 7', workshopCode: 'W_LPC11', professionCode: 'STACKER' },
  { name: 'Ж/д тупик № 8', workshopCode: 'W_LPC11', professionCode: 'STACKER' },
  { name: 'Ж/д тупик № 10', workshopCode: 'W_LPC11', professionCode: 'STACKER' },

  // Производство реквизитов
  {
    name: 'Производство реквизитов',
    workshopCode: 'W_LPC11',
    professionCode: 'PACKING_FOREMAN',
  },
  {
    name: 'Производство реквизитов',
    workshopCode: 'W_LPC11',
    professionCode: 'DRIVER',
  },
  {
    name: 'Производство реквизитов',
    workshopCode: 'W_LPC11',
    professionCode: 'CUTTER',
  },
];
