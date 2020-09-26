export interface HeaderProps {
  isMentorStatus: boolean;
  changeMentorStatus(): void;
  setShowModalSetting: (value: boolean) => void;
  isShowSettingsModal: boolean;
  types: {
    type: string;
    color: string;
  }[];
  setColorType: (value: any) => void;
}
