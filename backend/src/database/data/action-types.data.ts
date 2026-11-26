import { IActionType } from '../../shared/interfaces/api.interface';

export const actionTypes: IActionType[] = [
  { actionCode: 'pack', name: 'Упаковка' },
  { actionCode: 'fix', name: 'Припаковка' },
  { actionCode: 'repack', name: 'Переупаковка' },
  { actionCode: 'case', name: 'Чехол' },
];
