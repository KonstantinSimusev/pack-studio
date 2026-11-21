import { IHomeTeam } from '../../../utils/api.interfaces';

import styles from './team-card.module.css';

interface IProps {
  team: IHomeTeam;
  onClick: () => void;
}

export const TeamCard = ({ team, onClick }: IProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>БР {team.teamNumber}</h2>
        <span
          className={styles.workshopName}
        >{`УУМ ${team.workshopName}`}</span>
      </div>

      <span className={styles.infoBlock}>
        <span className={styles.text}>Руководитель</span>
        <span className={styles.fullname}>
          <span className={styles.lastName}>{team.managerLastName}</span>
          <span
            className={styles.name}
          >{`${team.managerFirstName} ${team.managerPatronymic}`}</span>
        </span>
      </span>
      <span className={styles.infoBlock}>
        <span className={styles.text}>Состав бригады</span>
        <span className={styles.count}>{team.teamEmployeesTotal}</span>
      </span>

      <button type='button' className={styles.button} onClick={onClick}>
        Подробнее
      </button>
    </div>
  );
};
