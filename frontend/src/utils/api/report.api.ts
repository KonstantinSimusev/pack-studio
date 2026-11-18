import { BASE_PATH } from '../api.config';
import { ISuccess, IUpdateReport } from '../api.interfaces';

export const updateReportApi = async (
  data: IUpdateReport,
): Promise<ISuccess> => {
  try {
    const response = await fetch(`${BASE_PATH}/reports`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

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
