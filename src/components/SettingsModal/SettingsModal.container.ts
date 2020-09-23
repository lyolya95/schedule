import { connect } from 'react-redux';
import { setShowModalSettings, StateModel } from '../../reducers';
import { SettingsModal } from './SettingsModal';

const mapStateToProps = (state: StateModel) => {
  return {
    isShowSettingsModal: state.isShowSettingsModal,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setShowModalSetting: (value: boolean) => dispatch(setShowModalSettings(value)),
  };
};
export const SettingsModalContainer = connect(mapStateToProps, mapDispatchToProps)(SettingsModal);
