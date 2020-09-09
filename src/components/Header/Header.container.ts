import { connect } from 'react-redux';
import { StateModel } from '../../reducers';
import { Header } from './Header';

const mapStateToProps = (state: StateModel) => {
  return {
    isShowCalendarOrTable: state.isShowCalendarOrTable,
  };
};

export const HeaderContainer = connect(mapStateToProps)(Header);
