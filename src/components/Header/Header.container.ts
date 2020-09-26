import { connect } from 'react-redux';
import { changeMentorStatus } from '../../actions';
import { setColorType, setShowModalSettings } from '../../reducers';
import { StateModel } from '../../reducers/reducers.model';
import { Header } from './Header';

const mapStateToProps = (state: StateModel) => {
  return {
    isMentorStatus: state.isMentorStatus,
    isShowSettingsModal: state.isShowSettingsModal,
    types: state.types,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeMentorStatus: () => dispatch(changeMentorStatus()),
    setShowModalSetting: (value: boolean) => dispatch(setShowModalSettings(value)),
    setColorType: (value: any) => dispatch(setColorType(value)),
  };
};
export const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);
