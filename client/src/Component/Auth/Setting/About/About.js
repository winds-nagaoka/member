import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import * as lib from '../../../../Library/Library'

import { setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'

import Logo from '../../../../Asset/hr.svg'

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
    this.props.setNavigationTitle('このアプリについて')
    this.props.setBackNavigation(true, '/setting')
  }

  render () {
    return (
      <React.Fragment>

        <div className={'contents-header' + lib.pcClass(this.props.pc)}>
          <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/setting'>設定</Link><i className="fas fa-chevron-right"></i><Link to='/setting/about'>このアプリについて</Link></div>
          <h2>このアプリについて</h2>
        </div>

        <div className={'box about ' + lib.pcClass(this.props.pc)}>
          <div className='app-version'>
            <div><Logo /></div>
            <div>
              <div className='app-title'><span>会員専用アプリ</span></div>
              <div className='app-version-number'><span><span>Version</span><span>{lib.version}</span></span></div>
              {/* {update} */}
            </div>
          </div>
          <div className='text'>
            <h2>アカウントについて</h2>
            <p>
              ひとつのアカウントで同時に複数の端末にログインすることができるようになりました。
            </p>
            <p>
              アカウント登録の際に記録される情報は、入力いただいた名前、パスワードおよび登録日時のみです。
              パスワードはSHA-512でハッシュ化し保存しています。
              これらの情報はアカウントを削除すると全て消去されます。
            </p>
            <h2>楽曲再生時の注意点</h2>
            <p>
              アプリにて閲覧できる音源、写真、映像はウェブ利用にあわせ圧縮および最適化しています。
              高品質でご覧になりたい場合はCDやDVDをご利用ください。
              また、オリジナルのデータが必要な場合はお問い合わせください。
            </p>
            <p>
              再生ごとにサーバーから音源データを取得するため通信量がかかります。
              録音は5分あたり5MBほど、映像は5分あたり20MBほど使用します。
              WiFiの使用を推奨します。
            </p>
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
