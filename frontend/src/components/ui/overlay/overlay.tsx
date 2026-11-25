import { useContext } from 'react';

import { useEscapeHandler } from '../../../hooks/use-escape-handler';

import { LayerContext } from '../../../contexts/layer/layerContext';

import styles from './overlay.module.css';

export const Overlay = () => {
  const {
    isOverlayOpen,
    isMenuOpen,
    isLoginOpen,
    isLogoutOpen,
    isEmployeeSearchOpen,
    isEmployeeCreateOpen,
    isEmployeeEditOpen,
    isEmployeeDeleteOpen,
    isAccountInfoOpen,
    isPasswordUpdateOpen,
    isShiftCreateOpen,
    isEmployeeAddOpen,
    isEmployeeShiftEditOpen,
    isEmployeeShiftDeleteOpen,
    isReportUpdateOpen,
    isScanCardDeleteOpen,
    isManualInputCreateOpen,

    setIsOverlayOpen,
    setIsMenuOpen,
    setIsLoginOpen,
    setIsLogoutOpen,
    setIsEmployeeSearchOpen,
    setIsEmployeeCreateOpen,
    setIsEmployeeEditOpen,
    setIsEmployeeDeleteOpen,
    setIsPasswordUpdateOpen,
    setIsShiftCreateOpen,
    setIsEmployeeAddOpen,
    setIsEmployeeShiftEditOpen,
    setIsEmployeeShiftDeleteOpen,
    setIsReportUpdateOpen,
    setIsScanCardDeleteOpen,
    setIsManualInputCreateOpen,
  } = useContext(LayerContext);

  useEscapeHandler(() => {
    if (isAccountInfoOpen) {
      return;
    }

    if (isOverlayOpen) {
      setIsOverlayOpen(false);
    }

    if (isMenuOpen) {
      setIsMenuOpen(false);
    }

    if (isLoginOpen) {
      setIsLoginOpen(false);
    }

    if (isLogoutOpen) {
      setIsLogoutOpen(false);
    }

    if (isEmployeeSearchOpen) {
      setIsEmployeeSearchOpen(false);
    }

    if (isEmployeeCreateOpen) {
      setIsEmployeeCreateOpen(false);
    }

    if (isEmployeeEditOpen) {
      setIsEmployeeEditOpen(false);
    }

    if (isEmployeeDeleteOpen) {
      setIsEmployeeDeleteOpen(false);
    }

    if (isPasswordUpdateOpen) {
      setIsPasswordUpdateOpen(false);
    }

    if (isShiftCreateOpen) {
      setIsShiftCreateOpen(false);
    }

    if (isEmployeeAddOpen) {
      setIsEmployeeAddOpen(false);
    }

    if (isEmployeeShiftEditOpen) {
      setIsEmployeeShiftEditOpen(false);
    }

    if (isEmployeeShiftDeleteOpen) {
      setIsEmployeeShiftDeleteOpen(false);
    }

    if (isReportUpdateOpen) {
      setIsReportUpdateOpen(false);
    }

    if (isScanCardDeleteOpen) {
      setIsScanCardDeleteOpen(false);
    }

    if (isManualInputCreateOpen) {
      setIsManualInputCreateOpen(false);
    }
  });

  const handleClick = (event: React.MouseEvent) => {
    // Проверяем, был ли клик по самому оверлею
    if (event.target === event.currentTarget) {
      if (isAccountInfoOpen) {
        return;
      }

      setIsOverlayOpen(false);
      setIsMenuOpen(false);
      setIsLoginOpen(false);
      setIsLogoutOpen(false);
      setIsEmployeeSearchOpen(false);
      setIsEmployeeCreateOpen(false);
      setIsEmployeeEditOpen(false);
      setIsEmployeeDeleteOpen(false);
      setIsPasswordUpdateOpen(false);
      setIsShiftCreateOpen(false);
      setIsEmployeeAddOpen(false);
      setIsEmployeeShiftEditOpen(false);
      setIsEmployeeShiftDeleteOpen(false);
      setIsReportUpdateOpen(false);
      setIsScanCardDeleteOpen(false);
      setIsManualInputCreateOpen(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={handleClick} tabIndex={-1}></div>
  );
};
