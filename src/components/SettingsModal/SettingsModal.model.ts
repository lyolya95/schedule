export interface SettingsModalProps {
  setShowModalSetting: (value: boolean) => void;
  isShowSettingsModal: boolean;
  types: {
    type: string;
    color: string;
  }[];
  setColorType: (value: any) => void;
}
