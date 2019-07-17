import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import * as lib from '../../../../Library/Library'

import { redirect, setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'
import { closePlayer } from '../../../../Actions/Audio'

import Modify from '../Component/Modify/Modify'

import './Name.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    loading: state.status.loading,
    user: state.status.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    redirect (location) {
      dispatch(redirect(location))
    },
    setNavigationTitle (title) {
      dispatch(setNavigationTitle(title))
    },
    setBackNavigation (backNavigation, backNavigationPath) {
      dispatch(setBackNavigation(backNavigation, backNavigationPath))
    }
  }
}

class Name extends Component {
  componentDidMount () {
    this.props.setNavigationTitle('名前の変更')
    this.props.setBackNavigation(true, '/setting')
  }

  componentWillUnmount () {
  }

  nameChanged () {
    this.props.redirect('/setting')
  }

  canceled () {
    this.props.redirect('/setting')
  }

  render () {
    return (
      <React.Fragment>

        <div className={'contents-header' + lib.pcClass(this.props.pc)}>
          <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/setting'>設定</Link><i className="fas fa-chevron-right"></i><Link to='/setting/name'>名前の変更</Link></div>
          <h2>名前の変更</h2>
          <p>名前を変える意味はあんまりないです</p>
        </div>

        <Modify
          api={lib.getAuthPath() + '/api/setting/username'}
          text={this.props.user.name}
          title='名前'
          onComplete={() => this.nameChanged()}
          onCancel={() => this.canceled()}
        />

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

export default connect(mapStateToProps, mapDispatchToProps)(Name)
