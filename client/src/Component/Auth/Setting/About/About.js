import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import * as lib from '../../../../Library/Library'

import { setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'

import './About.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    loading: state.status.loading,
    user: state.status.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setNavigationTitle (title) {
      dispatch(setNavigationTitle(title))
    },
    setBackNavigation (backNavigation, backNavigationPath) {
      dispatch(setBackNavigation(backNavigation, backNavigationPath))
    }
  }
}

class About extends Component {
  componentDidMount () {
    this.props.setNavigationTitle('ライセンス情報')
    this.props.setBackNavigation(true, '/setting')
  }

  render () {
    return (
      <React.Fragment>

        <div className={'contents-header' + lib.pcClass(this.props.pc)}>
          <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/setting'>設定</Link><i className="fas fa-chevron-right"></i><Link to='/setting/about'>このアプリについて</Link></div>
          <h2>このアプリについて</h2>
        </div>

        <div className={'box' + lib.pcClass(this.props.pc)}>
          <div className='text'>
            あとで書きます
          </div>
        </div>

        <div className={'box' + lib.pcClass(this.props.pc)}>
          <div className='back-link'>
            <ul>
              <li><Link to='/setting'><div className='inner'><i className="fas fa-angle-left"></i><span>戻る</span></div></Link></li>
            </ul>
          </div>
        </div>

      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(About)
