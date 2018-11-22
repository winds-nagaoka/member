import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { getManager } from '../../../Actions/Manager'

function mapStateToProps(state) {
  return {
    loadingManager: state.manager.loading,
    manager: state.manager.data
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getManager () {
      dispatch(getManager())
    }
  }
}

class Manager extends Component {
  componentDidMount () {
    this.props.getManager()
  }

  renderManager (loading, manager) {
    if (loading || !manager) return <div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div>
    return manager.manager.map((each, i) => {
      return <div key={'manager' + i}><div>{each.title}</div><div dangerouslySetInnerHTML={{__html: each.text}}></div></div>
    })
  }

  render () {
    // State List
    const { loadingManager, manager } = this.props
    // Dispatch List
    // none

    const showManager = this.renderManager(loadingManager, manager)
    return (
      <div>
        Manager
        <div>
          <div>
            {showManager}
          </div>
        </div>
        <div>
          <Link to='/'>ホーム</Link>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Manager)
