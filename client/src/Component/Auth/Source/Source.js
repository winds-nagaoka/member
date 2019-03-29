import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { setNavigationTitle, setBackNavigation } from '../../../Actions/Navigation'
import { getSource } from '../../../Actions/Source'
import { sourcePlayRequest } from '../../../Actions/Audio'

import * as lib from '../../../Library/Library'
import * as libSource from './Library/Library'

import './Source.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,

    loading: state.source.loading,
    list: state.source.list
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
    getSource () {
      dispatch(getSource())
    },
    sourcePlayRequest (sourceid, sourceNumber, playRequest) {
      dispatch(sourcePlayRequest(sourceid, sourceNumber, playRequest))
    }
  }
}

class Source extends Component {
  componentDidMount () {
    this.props.setNavigationTitle('参考音源')
    this.props.setBackNavigation(true, '/')
    this.props.getSource()
  }

  renderList (item) {
    var data = item.data
    return item.contents.map((list, i) => {
      var ml = list.music.map((ml, j) => {
        var composer = 'composer' in data[ml] ? 'arranger' in data[ml] ? <span className='composer'>{data[ml].composer}{data[ml].composer.match(/民謡/) ? '' : '作曲'}<span>/</span>{data[ml].arranger}編曲</span> : <span className='composer'>{data[ml].composer}</span> : 'arranger' in data[ml] ? <span className='composer'>{data[ml].arranger}編曲</span> : ''
        var additional = 'add' in data[ml] ? <ol>{data[ml].add.map((mv, k) => (<li key={'a' + item.id + k}>{mv}</li>))}</ol> : ''
        var movement = 'movement' in data[ml] ? <ol>{data[ml].movement.map((mv, k) => (<li key={'a' + item.id + k}>{mv}</li>))}</ol> : ''
        var clickHandler = 'audio' in data[ml] ? () => { this.props.sourcePlayRequest(item.id, data[ml].audio, true) } : () => {}
        var hasAudio = 'audio' in data[ml] ? <i className="fas fa-play-circle"></i> : <i className="far fa-times-circle"></i>
        return (
          <li key={'m' + item.id + j} className={'track' + ('audio' in data[ml] ? ' has-audio' : '')} onClick={clickHandler}>
            <div>{hasAudio}</div>
            <div><span>{data[ml].title}</span>{composer}{additional}{movement}</div>
          </li>
        )
      })
      return (
        <li key={'l' + item.id + i}>
          <label className={'sticky-label' + (list.label.match(/第[0-9]部/) ? '' : ' other') + lib.pcClass(this.props.pc)}>{list.label}</label>
          <ol>{ml}</ol>
        </li>
      )
    })
  }

  renderSource () {
    if (this.props.loading || !this.props.list) return <div className={'box source-list' + lib.pcClass(this.props.pc)}><div className="loading"><div className="loading1"></div><div className="loading2"></div><div className="loading3"></div></div></div>
    console.log(this.props.list)
    return this.props.list.map((each, i) => {
      const showList = this.renderList(each.detail)
      console.log(each)
      return (
        <div key={'source' + i} className={'box source-list' + lib.pcClass(this.props.pc)}>
          <div className='title-frame'>
            <label>{each.detail.title}</label>
            <ol>{showList}</ol>
          </div>
        </div>
      )
    })
  }

  render () {
    const showSource = this.renderSource()
    return (
      <div className={'source' + lib.pcClass(this.props.pc)}>
        <div className={'contents-header' + lib.pcClass(this.props.pc)}>
          <div className='bread-navigation'><Link to='/'>ホーム</Link><i className="fas fa-chevron-right"></i><Link to='/source'>参考音源</Link></div>
          <h2>参考音源</h2>
          <p>直近の演奏会の参考音源です。</p>
        </div>

        {/* <div className={'box source-list' + lib.pcClass(this.props.pc)}> */}
          {showSource}
        {/* </div> */}

        <div className={'box back-to-home' + lib.pcClass(this.props.pc)}>
          <div className='back-link'>
            <ul>
              <li><Link to='/'><div className='inner'><i className="fas fa-angle-left"></i><span>ホーム</span></div></Link></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Source)
