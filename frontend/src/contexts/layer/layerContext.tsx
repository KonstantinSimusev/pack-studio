import { createContext } from 'react';
import { TActionCode } from '../../utils/constants';
import { IScanCard } from '../../utils/api.interfaces';

interface ILayerContextValue {
  isAgreed: boolean;
  isOverlayOpen: boolean;
  isMenuOpen: boolean;
  isLoginOpen: boolean;
  isLogoutOpen: boolean;
  isEmployeeSearchOpen: boolean;
  isEmployeeCreateOpen: boolean;
  isEmployeeEditOpen: boolean;
  isEmployeeDeleteOpen: boolean;
  isAccountInfoOpen: boolean;
  isPasswordUpdateOpen: boolean;
  isShiftCreateOpen: boolean;
  isEmployeeAddOpen: boolean;
  isEmployeeShiftEditOpen: boolean;
  isEmployeeShiftDeleteOpen: boolean;
  isReportUpdateOpen: boolean;
  isScanCardDeleteOpen: boolean;
  isManualInputCreateOpen: boolean;

  selectedId: string;
  selectedDate: string | null;
  selectedActionCode: TActionCode;
  scanCards: IScanCard[];

  setIsAgreed: (value: boolean) => void;
  setIsOverlayOpen: (value: boolean) => void;
  setIsMenuOpen: (value: boolean) => void;
  setIsLoginOpen: (value: boolean) => void;
  setIsLogoutOpen: (value: boolean) => void;
  setIsEmployeeSearchOpen: (value: boolean) => void;
  setIsEmployeeCreateOpen: (value: boolean) => void;
  setIsEmployeeEditOpen: (value: boolean) => void;
  setIsEmployeeDeleteOpen: (value: boolean) => void;
  setIsAccountInfoOpen: (value: boolean) => void;
  setIsPasswordUpdateOpen: (value: boolean) => void;
  setIsShiftCreateOpen: (value: boolean) => void;
  setIsEmployeeAddOpen: (value: boolean) => void;
  setIsEmployeeShiftEditOpen: (value: boolean) => void;
  setIsEmployeeShiftDeleteOpen: (value: boolean) => void;
  setIsReportUpdateOpen: (value: boolean) => void;
  setIsScanCardDeleteOpen: (value: boolean) => void;
  setIsManualInputCreateOpen: (value: boolean) => void;

  setSelectedId: (value: string) => void;
  setSelectedDate: (value: string | null) => void;
  setSelectedActionCode: (value: TActionCode) => void;
  setScanCards: React.Dispatch<React.SetStateAction<IScanCard[]>>;
}

export const LayerContext = createContext<ILayerContextValue>({
  isAgreed: false,
  isOverlayOpen: false,
  isMenuOpen: false,
  isLoginOpen: false,
  isLogoutOpen: false,
  isEmployeeSearchOpen: false,
  isEmployeeCreateOpen: false,
  isEmployeeEditOpen: false,
  isEmployeeDeleteOpen: false,
  isAccountInfoOpen: false,
  isPasswordUpdateOpen: false,
  isShiftCreateOpen: false,
  isEmployeeAddOpen: false,
  isEmployeeShiftEditOpen: false,
  isEmployeeShiftDeleteOpen: false,
  isReportUpdateOpen: false,
  isScanCardDeleteOpen: false,
  isManualInputCreateOpen: false,

  selectedId: '',
  selectedDate: null,
  selectedActionCode: 'pack',
  scanCards: [],

  setIsAgreed: () => {},
  setIsOverlayOpen: () => {},
  setIsMenuOpen: () => {},
  setIsLoginOpen: () => {},
  setIsLogoutOpen: () => {},
  setIsEmployeeSearchOpen: () => {},
  setIsEmployeeCreateOpen: () => {},
  setIsEmployeeEditOpen: () => {},
  setIsEmployeeDeleteOpen: () => {},
  setIsAccountInfoOpen: () => {},
  setIsPasswordUpdateOpen: () => {},
  setIsShiftCreateOpen: () => {},
  setIsEmployeeAddOpen: () => {},
  setIsEmployeeShiftEditOpen: () => {},
  setIsEmployeeShiftDeleteOpen: () => {},
  setIsReportUpdateOpen: () => {},
  setIsScanCardDeleteOpen: () => {},
  setIsManualInputCreateOpen: () => {},

  setSelectedId: () => {},
  setSelectedDate: () => {},
  setSelectedActionCode: () => {},
  setScanCards: () => {},
});
