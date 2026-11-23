import { IReportArea } from '../../shared/interfaces/api.interface';

export const reportAreas: IReportArea[] = [
  // production
  {
    areaCode: '001_STAN_2000',
    shortName: 'СТАН',
    name: 'СТАН-2000',
    workshopCode: 'W_LPC11',
    reportTypeCode: '001_production',
  },
  {
    areaCode: '002_ANGC',
    shortName: 'АНГЦ',
    name: 'АНГЦ',
    workshopCode: 'W_LPC11',
    reportTypeCode: '001_production',
  },
  {
    areaCode: '003_ANO_GC',
    shortName: 'АНО',
    name: 'АНО-ГЦ',
    workshopCode: 'W_LPC11',
    reportTypeCode: '001_production',
  },
  {
    areaCode: '004_AI',
    shortName: 'АИ',
    name: 'АИ',
    workshopCode: 'W_LPC11',
    reportTypeCode: '001_production',
  },
  {
    areaCode: '005_ANGC_3',
    shortName: 'АНГЦ-3',
    name: 'АНГЦ-3',
    workshopCode: 'W_LPC11',
    reportTypeCode: '001_production',
  },
  // shipment
  {
    areaCode: '006_GD_06',
    shortName: 'Туп 6',
    name: 'Ж/д тупик № 6',
    workshopCode: 'W_LPC11',
    reportTypeCode: '003_shipment',
  },
  {
    areaCode: '007_GD_07',
    shortName: 'Туп 7',
    name: 'Ж/д тупик № 7',
    workshopCode: 'W_LPC11',
    reportTypeCode: '003_shipment',
  },
  {
    areaCode: '008_GD_08',
    shortName: 'Туп 8',
    name: 'Ж/д тупик № 8',
    workshopCode: 'W_LPC11',
    reportTypeCode: '003_shipment',
  },
  {
    areaCode: '009_GD_10',
    shortName: 'Туп 10',
    name: 'Ж/д тупик № 10',
    workshopCode: 'W_LPC11',
    reportTypeCode: '003_shipment',
  },
  // pack
  {
    areaCode: '010_LUR',
    shortName: 'ЛУР',
    name: 'ЛУР',
    workshopCode: 'W_LPC11',
    reportTypeCode: '002_pack',
  },
  {
    areaCode: '011_OCH_01',
    shortName: '1 оч',
    name: '1 очередь',
    workshopCode: 'W_LPC11',
    reportTypeCode: '002_pack',
  },
  {
    areaCode: '012_OCH_02',
    shortName: '2 оч',
    name: '2 очередь',
    workshopCode: 'W_LPC11',
    reportTypeCode: '002_pack',
  },
  {
    areaCode: '013_OCH_03',
    shortName: '3 оч',
    name: '3 очередь',
    workshopCode: 'W_LPC11',
    reportTypeCode: '002_pack',
  },
  // residue
  {
    areaCode: '014_OCH_01',
    shortName: '1 оч',
    name: '1 очередь',
    workshopCode: 'W_LPC11',
    reportTypeCode: '004_residue',
  },
  {
    areaCode: '015_OCH_02',
    shortName: '2 оч',
    name: '2 очередь',
    workshopCode: 'W_LPC11',
    reportTypeCode: '004_residue',
  },
  {
    areaCode: '016_OCH_03',
    shortName: '3 оч',
    name: '3 очередь',
    workshopCode: 'W_LPC11',
    reportTypeCode: '004_residue',
  },
];
