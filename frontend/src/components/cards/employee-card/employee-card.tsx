import { IEmployeeInfo } from '../../../utils/api.interfaces';

import { CardContainer } from '../../ui/card-container/card-container';
import { IconButton } from '../../ui/buttons/icon-button/icon-button';
import { TableBlock } from '../../ui/table-block/table-block';

import { EditIcon } from '../../ui/icons/edit/edit';
import { PasswordIcon } from '../../ui/icons/password/password';
import { ProfileIcon } from '../../ui/icons/profile/profile';

import styles from './employee-card.module.css';
import { DeleteIcon } from '../../ui/icons/delete/delete';

interface IProps {
  employee: IEmployeeInfo;
  onUpdateEmployee: () => void;
  onUpdatePassword: () => void;
  onDeleteEmployee: () => void;
}

export const EmployeeCard = ({
  employee,
  onUpdateEmployee,
  onUpdatePassword,
  onDeleteEmployee,
}: IProps) => {
  return (
    <CardContainer className={styles.container}>
      <div className={styles.profile}>
        <ProfileIcon width={68} height={68} />
        <span className={styles.fullname}>
          <span className={styles.lastName}>{employee.lastName}</span>
          <span className={styles.name}>{employee.firstName}</span>
          <span className={styles.name}>{employee.patronymic}</span>
        </span>
      </div>
      <div className={styles.buttons}>
        <IconButton
          type='button'
          className={styles.button}
          onClick={onUpdateEmployee}
        >
          <EditIcon width={22} height={22} />
        </IconButton>

        <IconButton
          type='button'
          className={styles.button}
          onClick={onUpdatePassword}
        >
          <PasswordIcon width={22} height={22} />
        </IconButton>

        <IconButton
          type='button'
          onClick={onDeleteEmployee}
          className={styles.button}
        >
          <DeleteIcon width={22} height={22} />
        </IconButton>
      </div>

      <div className={styles.table}>
        <span className={styles.tableTitle}>Текущее назначение</span>

        <TableBlock title='Цех' text={employee.currentWorkshopName ?? '-'} />

        <TableBlock
          title='Бригада №'
          text={employee.currentTeamNumber ?? '-'}
        />

        <TableBlock title='Профессия' text={employee.currentProfessionName} />
        <TableBlock title='График' text={employee.currentScheduleName} />

        <TableBlock
          title='Доступ в кабинет'
          text={employee.hasAccess ? 'Разрешён' : 'Запрещён'}
        />
      </div>

      <div className={styles.table}>
        <span className={styles.tableTitle}>Книга личного состава</span>

        <TableBlock title='Цех' text={employee.homeWorkshopName} />
        <TableBlock title='Бригада №' text={employee.homeTeamNumber} />
        <TableBlock title='Профессия' text={employee.homeProfessionName} />
        <TableBlock title='График' text={employee.homeScheduleName} />
        <TableBlock title='Личный №' text={employee.personalNumber} />
      </div>
    </CardContainer>
  );
};
