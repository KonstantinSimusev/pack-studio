import { IReportArea } from '../../shared/interfaces/api.interface';

export const reportAreas: IReportArea[] = [
  // production
  {
    areaCode: '001_STAN_2000',
    name: 'СТАН-2000',
    workshopCode: 'W_LPC11',
    reportTypeCode: 'production',
  },
  {
    areaCode: '002_ANGC',
    name: 'АНГЦ',
    workshopCode: 'W_LPC11',
    reportTypeCode: 'production',
  },
  {
    areaCode: '003_ANO_GC',
    name: 'АНО-ГЦ',
    workshopCode: 'W_LPC11',
    reportTypeCode: 'production',
  },
  {
    areaCode: '004_AI',
    name: 'АИ',
    workshopCode: 'W_LPC11',
    reportTypeCode: 'production',
  },
  {
    areaCode: '005_ANGC_3',
    name: 'АНГЦ-3',
    workshopCode: 'W_LPC11',
    reportTypeCode: 'production',
  },
  // shipment
  {
    areaCode: '006_GD_06',
    name: 'Ж/д тупик № 6',
    workshopCode: 'W_LPC11',
    reportTypeCode: 'shipment',
  },
  {
    areaCode: '007_GD_07',
    name: 'Ж/д тупик № 7',
    workshopCode: 'W_LPC11',
    reportTypeCode: 'shipment',
  },
  {
    areaCode: '008_GD_08',
    name: 'Ж/д тупик № 8',
    workshopCode: 'W_LPC11',
    reportTypeCode: 'shipment',
  },
  {
    areaCode: '009_GD_10',
    name: 'Ж/д тупик № 10',
    workshopCode: 'W_LPC11',
    reportTypeCode: 'shipment',
  },
  // pack
  {
    areaCode: '010_LUR',
    name: 'ЛУР',
    workshopCode: 'W_LPC11',
    reportTypeCode: 'pack',
  },
  {
    areaCode: '011_OCH_01',
    name: '1 очередь',
    workshopCode: 'W_LPC11',
    reportTypeCode: 'pack',
  },
  {
    areaCode: '012_OCH_02',
    name: '2 очередь',
    workshopCode: 'W_LPC11',
    reportTypeCode: 'pack',
  },
  {
    areaCode: '013_OCH_03',
    name: '3 очередь',
    workshopCode: 'W_LPC11',
    reportTypeCode: 'pack',
  },
  // residue
  {
    areaCode: '014_OCH_01',
    name: '1 очередь',
    workshopCode: 'W_LPC11',
    reportTypeCode: 'residue',
  },
  {
    areaCode: '015_OCH_02',
    name: '2 очередь',
    workshopCode: 'W_LPC11',
    reportTypeCode: 'residue',
  },
  {
    areaCode: '016_OCH_03',
    name: '3 очередь',
    workshopCode: 'W_LPC11',
    reportTypeCode: 'residue',
  },
];
