import clsx from 'clsx';

import { Button } from '../button/button';

import styles from './scan-button.module.css';
import { TActionCode } from '../../../../utils/constants';

interface IProps {
  actionCode: TActionCode;
  label: string;
  onAction: (actionCode: TActionCode) => void;
}

export const ScanButton = ({ actionCode, label, onAction }: IProps) => {
  return (
    <Button
      type='button'
      className={clsx(
        actionCode === 'pack' && styles.packButton,
        actionCode === 'fix' && styles.fixButton,
        actionCode === 'repack' && styles.repackButton,
        actionCode === 'case' && styles.caseButton,
      )}
      onClick={() => onAction(actionCode)}
    >
      {label}
    </Button>
  );
};
