export interface HeaderProps {
  isMentorStatus: boolean;
  changeMentorStatus(): void;
  setShowModalSetting: (value: boolean) => void;
  isShowSettingsModal: boolean;
}
