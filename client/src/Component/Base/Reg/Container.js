import { connect } from 'react-redux'
import Reg from './Component'
import { changeWindsid, changePassword, changeKey, register } from '../../../Actions/Reg'

function mapStateToProps(state) {
  return {
    windsid: state.reg.windsid,
    password: state.reg.password,
    approvalKey: state.reg.approvalKey,
    error: state.reg.error,
    loading: state.reg.loading
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
    changeKey (approvalKey) {
      dispatch(changeKey(approvalKey))
    },
    register () {
      dispatch(register())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reg)
