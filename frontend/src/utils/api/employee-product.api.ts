import { BASE_PATH } from '../api.config';

import { ICreateEmployeeProduct, ISuccess } from '../api.interfaces';

export const createEmployeeProductApi = async (
  data: ICreateEmployeeProduct,
): Promise<ISuccess> => {
  try {
    const response = await fetch(`${BASE_PATH}/employee-product-management`, {
      method: 'POST',
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
