import { IProfession } from '../../shared/interfaces/api.interface';

export const professions: IProfession[] = [
  { professionCode: 'MANAGER', name: 'Руководитель' },
  { professionCode: 'HEAD', name: 'Начальник участка' },
  { professionCode: 'MASTER', name: 'Сменный мастер' },
  { professionCode: 'LEAD_MASTER', name: 'Старший мастер участка' },
  { professionCode: 'DETAIL_MASTER', name: 'Мастер участка реквизитов' },
  {
    professionCode: 'PRODUCTION_FOREMAN',
    name: 'Бригадир УОП',
  },
  {
    professionCode: 'PACKING_FOREMAN',
    name: 'Бригадир ОГП',
  },
  { professionCode: 'PACKER', name: 'Укладчик-упаковщик' },
  { professionCode: 'PACKER_LUR', name: 'Укладчик-упаковщик ЛУР' },
  { professionCode: 'PACKER_APR8', name: 'Укладчик-упаковщик АПР-8' },
  { professionCode: 'REPAIR_MECHANIC', name: 'Слесарь-ремонтник' },
  { professionCode: 'STACKER', name: 'Штабелировщик металла' },
  { professionCode: 'STAMPER', name: 'Штамповщик' },
  { professionCode: 'DRIVER', name: 'Водитель погрузчика' },
  { professionCode: 'CUTTER', name: 'Резчик холодного металла' },
  { professionCode: 'GAS_CUTTER', name: 'Газорезчик' },
  {
    professionCode: 'LEAD_OPERATOR',
    name: 'Старший оператор ПУ',
  },
  { professionCode: 'OPERATOR', name: 'Оператор ПУ' },
];
