import { BASE_PATH } from '../api.config';
import { IAbsence, IReportList, IHomeTeam } from '../api.interfaces';

export const getHomeTeamsApi = async (): Promise<IHomeTeam[]> => {
  try {
    const response = await fetch(`${BASE_PATH}/team-management`, {
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

export const getLastShiftWithChartReportApi = async (
  teamNumber: number,
): Promise<IReportList | null> => {
  try {
    const url = `${BASE_PATH}/shift-management/${teamNumber}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
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
