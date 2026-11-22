import { BASE_PATH } from '../api.config';

export const downloadExcelReportApi = async (): Promise<Blob> => {
  try {
    const response = await fetch(`${BASE_PATH}/excel/reports`, {
      method: 'GET',
      credentials: 'include', // Важно для работы с cookie
    });

    if (!response.ok) {
      throw new Error('Не удалось загрузить отчёт');
    }

    // Возвращаем Blob с содержимым файла
    return await response.blob();
  } catch (error) {
    throw error;
  }
};
