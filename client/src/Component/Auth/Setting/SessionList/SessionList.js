import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'

import { connect } from 'react-redux'

import Back from '../../../../Library/Icons/Back'
import * as lib from '../../../../Library/Library'

import { setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'
import { requestDeleteSession } from '../../../../Actions/Setting'

import './SessionList.css'

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
    },
    requestDeleteSession (clientid) {
      dispatch(requestDeleteSession(clientid))
    }
  }
}

class SessionList extends Component {
  componentDidMount () {
    this.props.setNavigationTitle('セッションの管理')
    this.props.setBackNavigation(true, '/setting')
  }

  deleteConfirm (clientid) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='alert'>
            <h1>この端末をログアウトしますか？</h1>
            <p>ユーザー情報は端末に残りません。</p>
            <div className='button-group'>
              <button onClick={onClose}>キャンセル</button>
              <button onClick={() => {
                this.props.requestDeleteSession(clientid)
                onClose()
              }}>削除</button>
            </div>
          </div>
        )
      }
    })
  }

  lastLogin (time) {
    if (time / (1000*60*60*24*365) >= 1) {
      return Math.round(time / (1000*60*60*24*365)) + '年前'
    } else if (time / (1000*60*60*24) >= 1) {
      return Math.round(time / (1000*60*60*24)) + '日前'
    } else if (time / (1000*60*60) >= 1) {
      return Math.round(time / (1000*60*60)) + '時間前'
    } else if (time / (1000*60) >= 1) {
      return Math.round(time / (1000*60)) + '分前'
    } else {
      return Math.round(time / 1000) + '秒前'
    }
  }

  renderList () {
    if (this.props.user) {
      const clientList = this.props.user.clientList.sort((n, m) => n.lastLogin < m.lastLogin ? 1 : -1).map((each, i) => {
        const lastLogin = each.id === lib.getClientid() ? '今' : this.lastLogin((new Date()).getTime() - each.lastLogin)
        const selfLabel = each.id === lib.getClientid() ? <span className='self'>現在の端末</span> : false
        const icon = each.agent.match(/(iPhone|iPad|iPod|Android)/i) ? (each.agent.match(/iPad/i) ? <i className='fas fa-tablet-alt'></i> : <i className='fas fa-mobile-alt'></i>) : <i className='fas fa-desktop'></i>
        const deviceLabel = lib.browser(each.agent)
        const listClass = each.id === lib.getClientid() ? 'self' : 'other'
        const listClick = each.id === lib.getClientid() ? () => {} : () => this.deleteConfirm(each.id)
        return (
          <li key={'client-' + i} onClick={listClick} className={listClass}>
            <div className='icon'>
              {icon}
            </div>
            <div className='info'>
              <label>{deviceLabel}</label>
              {selfLabel}
              <div className='last-login'>{lastLogin}</div>
            </div>
          </li>
        )
      })
      return (
        <div>
          <ol>
            {clientList}
          </ol>
        </div>
      )
    }
  }

  render () {
    const showList = this.renderList()
    return (
      <React.Fragment>

        <div className={'contents-header' + lib.pcClass(this.props.pc)}>
          <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/setting'>設定</Link><i className="fas fa-chevron-right"></i><Link to='/setting/session'>セッションの管理</Link></div>
          <h2>セッションの管理</h2>
          <p>過去にログインした端末の管理ができます</p>
        </div>

        <div className={'box session-list ' + lib.pcClass(this.props.pc)}>
          {showList}
        </div>

        <div className={'box' + lib.pcClass(this.props.pc)}>
          <div className='back-link'>
            <ul>
              <li><Link to='/setting'><div className='inner'><Back /><span>戻る</span></div></Link></li>
            </ul>
          </div>
        </div>

      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionList)
