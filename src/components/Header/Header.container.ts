import { connect } from 'react-redux';
import { changeMentorStatus } from '../../actions';
import { setChangeVersionVisually, setColorType, setShowModalSettings } from '../../reducers';
import { StateModel } from '../../reducers/reducers.model';
import { Header } from './Header';

const mapStateToProps = (state: StateModel) => {
  return {
    isMentorStatus: state.isMentorStatus,
    isShowSettingsModal: state.isShowSettingsModal,
    types: state.types,
    isShowVersionVisually: state.isShowVersionVisually,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeMentorStatus: () => dispatch(changeMentorStatus()),
    setShowModalSetting: (value: boolean) => dispatch(setShowModalSettings(value)),
    setColorType: (value: any) => dispatch(setColorType(value)),
    setChangeVersionVisually: () => dispatch(setChangeVersionVisually()),
  };
};
export const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);
