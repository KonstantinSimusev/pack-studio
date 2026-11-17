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
          <div className={styles.actionsWrapper}>
            {employeeShift.canDelete === true && (
              <IconButton
                type='button'
                onClick={onDelete}
                className={styles.button}
              >
                <DeleteIcon width={22} height={22} />
              </IconButton>
            )}

            <IconButton
              type='button'
              onClick={onClick}
              className={styles.button}
            >
              <EditIcon width={22} height={22} />
            </IconButton>
          </div>

          <span className={styles.personalNumberWarpper}>
            <span className={styles.personalNumberText}>№</span>
            <span className={styles.personalNumber}>
              {employeeShift.employee.personalNumber}
            </span>
          </span>
        </div>
      </div>

      <div className={styles.bottomContainer}>
        <span className={styles.profession}>
          {employeeShift.shiftProfessionName}
        </span>

        <span className={styles.attendanceCode}>
          {employeeShift.attendanceCode}
        </span>
      </div>
    </div>
  );
};
