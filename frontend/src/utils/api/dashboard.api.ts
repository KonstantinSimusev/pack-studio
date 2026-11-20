import { BASE_PATH } from '../api.config';
import { IAbsence } from '../api.interfaces';

export const getAbsenceSummaryApi = async (): Promise<IAbsence[]> => {
  try {
    const response = await fetch(
      `${BASE_PATH}/shift-management/absence-summary`,
      {
        method: 'GET',
        credentials: 'include',
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error('Что-то пошло не так');
  }
};
