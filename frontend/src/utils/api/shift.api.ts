import { BASE_PATH } from '../api.config';
import {
  ICreateShift,
  ILastShift,
  IShift,
  IShiftReport,
  ISuccess,
} from '../api.interfaces';

export const createShiftApi = async (data: ICreateShift): Promise<ISuccess> => {
  try {
    const response = await fetch(`${BASE_PATH}/shift-management`, {
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

export const getLastShiftApi = async (): Promise<ILastShift | null> => {
  try {
    const response = await fetch(`${BASE_PATH}/shift-management/last-shift`, {
      method: 'GET',
      credentials: 'include', // Важно добавить эту строку
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    // Правильно парсим JSON и возвращаем объект
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error('Что-то пошло не так');
  }
};

export const getLastShiftReportsApi =
  async (): Promise<IShiftReport | null> => {
    try {
      const response = await fetch(
        `${BASE_PATH}/shift-management/last-shift-reports`,
        {
          method: 'GET',
          credentials: 'include', // Важно добавить эту строку
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      // Правильно парсим JSON и возвращаем объект
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }

      throw new Error('Что-то пошло не так');
    }
  };

export const getShiftByIdApi = async (id: string): Promise<IShift> => {
  try {
    const url = `${BASE_PATH}/shifts/${id}`;

    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
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

// export const getShiftsByDateApi = async (
//   shiftDate: string, // YYYY-MM-DD
// ): Promise<IShift[]> => {
//   try {
//     const url = `${BASE_PATH}/shift-management/shifts/date/${shiftDate}`;

//     const response = await fetch(url, {
//       method: 'GET',
//       credentials: 'include', // Важно добавить эту строку
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message);
//     }

//     // Правильно парсим JSON и возвращаем объект
//     return await response.json();
//   } catch (error) {
//     if (error instanceof Error) {
//       throw error;
//     }

//     throw new Error('Что-то пошло не так');
//   }
// };

// export const setCheckedByShiftIdApi = async (
//   shiftId: string,
// ): Promise<ISuccess> => {
//   try {
//     const url = `${URL}/shifts/${shiftId}/check`;

//     const res = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8',
//       },
//       credentials: 'include', // Важно добавить эту строку
//     });
//     if (!res.ok) {
//       const errorData = await res.json();
//       throw new Error(errorData.message);
//     }

//     // Правильно парсим JSON и возвращаем объект
//     return await res.json();
//   } catch (error) {
//     if (error instanceof Error) {
//       throw error;
//     }

//     throw new Error('Что-то пошло не так');
//   }
// };
