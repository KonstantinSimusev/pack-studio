import { useEffect } from 'react';

import { useDispatch, useSelector } from '../../services/store';
import { getHomeTeams } from '../../services/slices/dashboard/actions';

import {
  clearHomeTeams,
  selectHomeTeams,
} from '../../services/slices/dashboard/slice';

import { AbsenceBoard } from '../../components/absence-board/absence-board';
import { TeamList } from '../../components/lists/team-list/team-list';

import styles from './home-page.module.css';

export const HomePage = () => {
  const dispatch = useDispatch();
  const teams = useSelector(selectHomeTeams);

  // Обновление данных 1 раз в сутки и приоткрытие вкладки браузера вновь
  useEffect(() => {
    dispatch(getHomeTeams());

    // Мгновенное обновление при возврате на вкладку
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        dispatch(getHomeTeams());
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Очистка при уходе со страницы
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      dispatch(clearHomeTeams()); // Гарантированно сбросит в null
    };
  }, []);

  return (
    <div className={styles.container}>
      <TeamList list={teams ?? []} />
      <AbsenceBoard />
    </div>
  );
};
