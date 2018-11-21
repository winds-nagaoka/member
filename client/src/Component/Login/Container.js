import { connect } from 'react-redux'
import Login from './Component'
import { changeWindsid, changePassword, login } from '../../Actions/Login'

function mapStateToProps(state) {
  return {
    windsid: state.login.windsid,
    password: state.login.password,
    loading: state.login.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeWindsid (windsid) {
      dispatch(changeWindsid(windsid))
    },
    changePassword (password) {
      dispatch(changePassword(password))
    },
    login (windsid, password) {
      dispatch(login(windsid, password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
