import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import * as lib from '../../../../Library/Library'

import { setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'

import Logo from '../../../../Asset/hr.svg'

import './License.css'

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

class License extends Component {
  componentDidMount () {
    this.props.setNavigationTitle('ライセンス情報')
    this.props.setBackNavigation(true, '/setting')
  }

  render () {
    return (
      <React.Fragment>

        <div className={'contents-header' + lib.pcClass(this.props.pc)}>
          <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/setting'>設定</Link><i className="fas fa-chevron-right"></i><Link to='/setting/license'>ライセンス情報</Link></div>
          <h2>ライセンス情報</h2>
        </div>

        <div className={'box license ' + lib.pcClass(this.props.pc)}>
          <div className='app-version'>
            <div><Logo /></div>
            <div>
              <div className='app-title'><span>会員専用アプリ</span></div>
              <div className='app-version-number'><span><span>Version</span><span>{lib.version}</span></span></div>
            </div>
          </div>

          <div className='license-detail'>
            <h2>Application Dependencies</h2>
            <p><i className="fab fa-react"></i>Developed with React</p>
            <p><span className='react'>React</span><span>version</span><span>16.8.6</span></p>
            <p><span className='redux'>Redux</span><span>version</span><span>4.0.1</span></p>
            <p><span className='nodejs'>SuperAgent</span><span>version</span><span>3.8.2</span></p>
            <h2>Server Dependencies</h2>
            <p><i className="fab fa-node-js"></i>Developed with Node.js</p>
            <p><span className='express'>Express</span><span>version</span><span>4.17.1</span></p>
            <p><span className='nodejs'>NeDB</span><span>version</span><span>1.8.0</span></p>
            <h2>Based Technologies</h2>
            <p><i className="fab fa-html5"></i>HTML 5</p>
            <p><i className="fab fa-css3-alt"></i>CSS 3</p>
            <p><i className="fab fa-js"></i>JavaScript (ECMAScript2018)</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(License)
