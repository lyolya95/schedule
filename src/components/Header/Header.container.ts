import { connect } from 'react-redux';
import  {StateModel}  from '../../reducers';
import { Header } from './Header';
import {changeMentorStatus} from '../../actions';

const mapStateToProps = (state: StateModel) => {
  return {
    isMentorStatus: state.isMentorStatus,
  };
};

const mapDispatchToProps = (dispatch:any) =>{
  return {
    changeMentorStatus: () => dispatch(changeMentorStatus())
  }
}
export const HeaderContainer = connect(mapStateToProps,mapDispatchToProps)(Header);
