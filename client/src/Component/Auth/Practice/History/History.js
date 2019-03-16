import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'

import * as lib from '../../../../Library/Library'

import './History.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
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

class History extends Component {
  componentDidMount () {
    this.props.setNavigationTitle('練習の記録')
    this.props.setBackNavigation(true, '/')
  }

  componentWillUnmount () {

  }

  render () {
    // State List
    const { pc } = this.props


    return (
      <div className={'history' + lib.pcClass(pc)}>

        <div className={'contents-header' + lib.pcClass(pc)}>
          <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/history'>過去の記録</Link><span></span></div>
          <h2>過去の記録</h2>
          <p>練習の録音を掲載しています</p>
        </div>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(History)
