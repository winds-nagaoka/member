import { connect } from 'react-redux'
import Dashboard from './Component'
// import { changeWindsid, changePassword, login } from '../../../Actions/Login'
import { logout } from '../../../Actions/Status'

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout () {
      dispatch(logout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
