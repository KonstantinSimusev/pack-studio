import { IHomeTeam } from '../../utils/api.interfaces';
import { AbsenceBoard } from '../../components/absence-board/absence-board';
import { TeamList } from '../../components/lists/team-list/team-list';

import styles from './home-page.module.css';

const list: IHomeTeam[] = [
  {
    id: '1',
    workshopName: 'ЛПЦ-11',
    teamNumber: 1,
    managerLastName: 'Иванов',
    managerFirstName: 'Иван',
    managerPatronymic: 'Иванович',
    workersCount: 23,
  },
  {
    id: '2',
    workshopName: 'ЛПЦ-11',
    teamNumber: 2,
    managerLastName: 'Иванов',
    managerFirstName: 'Иван',
    managerPatronymic: 'Иванович',
    workersCount: 24,
  },
  {
    id: '3',
    workshopName: 'ЛПЦ-11',
    teamNumber: 3,
    managerLastName: 'Иванов',
    managerFirstName: 'Иван',
    managerPatronymic: 'Иванович',
    workersCount: 25,
  },
  {
    id: '4',
    workshopName: 'ЛПЦ-11',
    teamNumber: 4,
    managerLastName: 'Иванов',
    managerFirstName: 'Иван',
    managerPatronymic: 'Иванович',
    workersCount: 21,
  },
];

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <TeamList list={list} />
      <AbsenceBoard />
    </div>
  );
};
