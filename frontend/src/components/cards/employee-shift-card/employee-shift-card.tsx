import { ATTENDANCE_TYPE } from '../../../utils/constants';
import { IEmployeeShift } from '../../../utils/api.interfaces';

import { useSelector } from '../../../services/store';
import { selectShift } from '../../../services/slices/shift/slice';

import { IconButton } from '../../ui/buttons/icon-button/icon-button';
import { DeleteIcon } from '../../ui/icons/delete/delete';
import { EditIcon } from '../../ui/icons/edit/edit';
import { SuccessIcon } from '../../ui/icons/success/success';

import styles from './employee-shift-card.module.css';

interface IProps {
  employeeShift: IEmployeeShift;
  onClick: () => void;
  onDelete: () => void;
}

export const EmployeeShiftCard = ({
  employeeShift,
  onClick,
  onDelete,
}: IProps) => {
  const shift = useSelector(selectShift);

  if (!shift) {
    return null;
  }

  const hasWrkplace =
    employeeShift.workplaceName === null &&
    employeeShift.attendanceCode === ATTENDANCE_TYPE.Y
      ? 'Табель не отмечен'
      : employeeShift.workplaceName === null &&
          employeeShift.attendanceCode !== ATTENDANCE_TYPE.Y
        ? 'Нет на работе'
        : employeeShift.workplaceName;

  return (
    <div className={styles.card}>
      <div className={styles.topContainer}>
        <div className={styles.fullname}>
          <div className={styles.lastName}>
            <span>{employeeShift.employee.lastName}</span>
            {employeeShift.isReady === true && <SuccessIcon />}
          </div>
          <span className={styles.name}>
            {employeeShift.employee.firstName}
          </span>
          <span className={styles.name}>
            {employeeShift.employee.patronymic}
          </span>
        </div>

        <div className={styles.actions}>
          {employeeShift.canDelete === true && (
            <IconButton
              type='button'
              onClick={onDelete}
              className={styles.button}
            >
              <DeleteIcon width={24} height={24} />
            </IconButton>
          )}

          <IconButton type='button' onClick={onClick} className={styles.button}>
            <EditIcon width={24} height={24} />
          </IconButton>
        </div>
      </div>

      <span className={styles.infoBlock}>
        <span className={styles.text}>Профессия в смене</span>
        <span className={styles.profession}>
          {employeeShift.shiftProfessionName}
        </span>
      </span>

      <span className={styles.infoBlock}>
        <span className={styles.text}>Личный номер</span>
        <span className={styles.personalNumber}>
          {employeeShift.employee.personalNumber}
        </span>
      </span>

      <div className={styles.status}>
        <span className={styles.attendanceCode}>
          {hasWrkplace !== 'Табель не отмечен' && employeeShift.attendanceCode}
        </span>

        <span className={styles.workplaceName}>{hasWrkplace}</span>
      </div>
    </div>
  );
};
