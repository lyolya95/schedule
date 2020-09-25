import { connect } from 'react-redux';
import { setColorType, setShowModalSettings } from '../../reducers';
import { StateModel } from '../../reducers/reducers.model';
import { SettingsModal } from './SettingsModal';

const mapStateToProps = (state: StateModel) => {
  return {
    isShowSettingsModal: state.isShowSettingsModal,
    types: state.types,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setShowModalSetting: (value: boolean) => dispatch(setShowModalSettings(value)),
    setColorType: (value: any) => dispatch(setColorType(value)),
  };
};
export const SettingsModalContainer = connect(mapStateToProps, mapDispatchToProps)(SettingsModal);
