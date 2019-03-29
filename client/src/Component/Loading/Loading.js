import React, { Component } from 'react'

import { connect } from 'react-redux'

import * as lib from '../../Library/Library'

import Header from '../Base/Component/Header/Header'

// import WindsLogo from '../../../Asset/logo.svg'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

class Loading extends Component {
  render () {
    const { pc } = this.props
    return (
      <div className='auth'>
        <Header />
        <div className={'contents' + (pc ? ' pc' : ' mobile')}>
          <div className='full-loading'><div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div></div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading)
