import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import Back from '../../../../Library/Icons/Back'
import * as lib from '../../../../Library/Library'

import { setNavigationTitle, setBackNavigation } from '../../../../Actions/Navigation'

import Logo from '../../../../Asset/hr.svg'

import './Terms.css'

function mapStateToProps(state) {
  return {
    pc: state.status.pc,
    loading: state.status.loading,
    user: state.status.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setNavigationTitle(title) {
      dispatch(setNavigationTitle(title))
    },
    setBackNavigation(backNavigation, backNavigationPath) {
      dispatch(setBackNavigation(backNavigation, backNavigationPath))
    },
  }
}

class About extends Component {
  componentDidMount() {
    this.props.setNavigationTitle('ウィンズ会員規約')
    this.props.setBackNavigation(true, '/setting')
  }

  render() {
    return (
      <React.Fragment>
        <div className={'contents-header' + lib.pcClass(this.props.pc)}>
          <div className="bread-navigation">
            <Link to="/">ホーム</Link>
            <i className="fas fa-chevron-right"></i>
            <Link to="/setting">設定</Link>
            <i className="fas fa-chevron-right"></i>
            <Link to="/setting/terms">ウィンズ会員規約</Link>
          </div>
          <h2>ウィンズ会員規約</h2>
        </div>

        <div className={'box terms ' + lib.pcClass(this.props.pc)}>
          <div className="title">
            <div>
              <Logo />
            </div>
            <div>
              <div className="terms-title">
                <span>ザ・ウィンド・アンサンブル会員規約</span>
              </div>
            </div>
          </div>
          <div className="text">
            <div className="provision">
              <div className="sub-title">
                <h3>目的並びに会の設置</h3>
              </div>
              <div className="list-number">
                <h2>第一条</h2>
              </div>
              <div>
                <p>
                  音楽を通じて自己の情操の育成を図るとともに、仲間との友好を深め、長岡市および地域住民の公共的活動に寄与し、各種演奏活動を通じて地域および個人の音楽技術の向上を図ることを目的とし、ザ・ウィンド・アンサンブル(以下ウィンズという)を設置する。
                </p>
              </div>
            </div>
            <div className="provision">
              <div className="sub-title">
                <h3>名称</h3>
              </div>
              <div className="list-number">
                <h2>第二条</h2>
              </div>
              <div>
                <p>
                  ウィンズの正式名称はザ・ウィンド・アンサンブルであるが、対外的な事等でどこの団体かはっきりさせた方が良い場合などは、長岡ザ・ウィンド・アンサンブルと呼ぶ場合もある。また、愛称としてウィンズと呼ぶ場合もある。
                </p>
              </div>
            </div>
            <div className="provision">
              <div className="sub-title">
                <h3>組織</h3>
              </div>
              <div className="list-number">
                <h2>第三条</h2>
              </div>
              <div>
                <p>ウィンズは第一条の目的を理解し、入会した者をもって組織する。</p>
              </div>
            </div>
            <div className="provision">
              <div className="sub-title">
                <h3>事務局</h3>
              </div>
              <div className="list-number">
                <h2>第四条</h2>
              </div>
              <div>
                <p>ウィンズの事務局は長岡市在住の役員の家に置く。</p>
              </div>
            </div>
            <div className="provision">
              <div className="sub-title">
                <h3>役員</h3>
              </div>
              <div className="list-number">
                <h2>第五条</h2>
              </div>
              <div>
                <p>ウィンズに次の役員を置く。</p>
                <table>
                  <tbody>
                    <tr>
                      <th>代表</th>
                      <td>１名</td>
                    </tr>
                    <tr>
                      <th>代表代行</th>
                      <td>１名</td>
                    </tr>
                    <tr>
                      <th>事務局長</th>
                      <td>１名</td>
                    </tr>
                    <tr>
                      <th>ステージマネージャー(演奏会総括)</th>
                      <td>１名</td>
                    </tr>
                    <tr>
                      <th>会計</th>
                      <td>１名</td>
                    </tr>
                    <tr>
                      <th>トレーナー</th>
                      <td>１名</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="list-number-second">
                <h2>二</h2>
              </div>
              <div>
                <p>役員はザ・ウィンド・アンサンブル会員(以下会員という)の中から選出して決定する。</p>
              </div>
            </div>
            <div className="provision">
              <div className="sub-title">
                <h3>役員会</h3>
              </div>
              <div className="list-number">
                <h2>第五条二</h2>
              </div>
              <div>
                <p>ウィンズの運営を行うため第五条の役員をもって役員会を構成する。</p>
              </div>
              <div className="list-number-second">
                <h2>二</h2>
              </div>
              <div>
                <p>役員会は代表が招集する。</p>
              </div>
            </div>
            <div className="provision">
              <div className="sub-title">
                <h3>役員の任期</h3>
              </div>
              <div className="list-number">
                <h2>第六条</h2>
              </div>
              <div>
                <p>役員の任期は一年とし、毎年総会にて決定する。ただし再任を妨げない。</p>
              </div>
              <div className="list-number-second">
                <h2>二</h2>
              </div>
              <div>
                <p>役員に欠員が生じた場合は、十四日以内に前任者の指名もしくは会員の選出で補充する。</p>
              </div>
            </div>
            <div className="provision">
              <div className="sub-title">
                <h3>役員の任務</h3>
              </div>
              <div className="list-number">
                <h2>第七条</h2>
              </div>
              <div>
                <p>代表はウィンズを代表し、活動を統轄する。</p>
              </div>
              <div className="list-number-second">
                <h2>二</h2>
              </div>
              <div>
                <p>代表代行は代表を補佐するとともに、不在の時これを代行する。</p>
              </div>
              <div className="list-number-third">
                <h2>三</h2>
              </div>
              <div>
                <p>事務局長は事務局を運営し、通常活動における事務を担当する。</p>
              </div>
              <div className="list-number-fourth">
                <h2>四</h2>
              </div>
              <div>
                <p>ステージマネージャーは演奏会活動における事務を担当する。また、演奏会に関する会議を招集する。</p>
              </div>
              <div className="list-number-fifth">
                <h2>五</h2>
              </div>
              <div>
                <p>会計は運営資金の出納、出納簿の管理を行う。</p>
              </div>
              <div className="list-number-sixth">
                <h2>六</h2>
              </div>
              <div>
                <p>
                  トレーナーは指揮者を補佐するとともに、不在の時はこれを代行する。また、指揮者が会員で無い場合は音楽全般について統轄する。
                </p>
              </div>
            </div>
            <div className="provision">
              <div className="sub-title">
                <h3>指揮者</h3>
              </div>
              <div className="list-number">
                <h2>第八条</h2>
              </div>
              <div>
                <p>
                  上記役員とは別に、指揮者を置く。指揮者は音楽全般について統轄する。また、指揮者が必要と認めたとき、副指揮者、トレーナー等を指名することができる。
                </p>
              </div>
            </div>
            <div className="provision">
              <div className="sub-title">
                <h3>係</h3>
              </div>
              <div className="list-number">
                <h2>第九条</h2>
              </div>
              <div>
                <p>上記役員の他に必要に応じて次の係を置くことができる。統轄は事務局とする。</p>
                <p>会場予約、楽譜、受付、お弁当、打ち上げ、ポスター、チケット、パートマネージャー 等</p>
              </div>
            </div>
            <div className="provision">
              <div className="sub-title">
                <h3>会員の義務</h3>
              </div>
              <div className="list-number">
                <h2>第十条</h2>
              </div>
              <div>
                <p>会員は常に音楽技術の向上に努めなければならない。</p>
              </div>
              <div className="list-number-second">
                <h2>二</h2>
              </div>
              <div>
                <p>練習中および演奏中は規律ある態度のもとに全力を挙げてこれに専念しなければならない。</p>
              </div>
              <div className="list-number-third">
                <h2>三</h2>
              </div>
              <div>
                <p>会員は自々の本業に著しく支障をきたす活動を行ったり、これを強要してはいけない。</p>
              </div>
              <div className="list-number-fourth">
                <h2>四</h2>
              </div>
              <div>
                <p>
                  会員は特殊な事情の無い限り定期演奏会に出演することとし、その時運営資金として役員会が決定した金額を収めなければならない。
                </p>
              </div>
            </div>
            <div className="provision">
              <div className="sub-title">
                <h3>義務違反</h3>
              </div>
              <div className="list-number">
                <h2>第十一条</h2>
              </div>
              <div>
                <p>
                  代表は会員が前条の会員の義務に反し、若しくはウィンズの規律を乱しウィンズ会員として好ましくないと認めた時は退団を命ずることができる。
                </p>
              </div>
            </div>
            <div className="provision">
              <div className="sub-title">
                <h3>欠席等の届け出</h3>
              </div>
              <div className="list-number">
                <h2>第十二条</h2>
              </div>
              <div>
                <p>
                  会員は出演日に欠席しようとするときはあらかじめ代表もしくはパートマネージャーに届け出るものとする。
                </p>
              </div>
            </div>
            <div className="provision">
              <div className="sub-title">
                <h3>服装</h3>
              </div>
              <div className="list-number">
                <h2>第十三条</h2>
              </div>
              <div>
                <p>会員は出演するときは定められた服装を着用するものとする。</p>
              </div>
            </div>
            <div className="provision">
              <div className="sub-title">
                <h3>運営資金</h3>
              </div>
              <div className="list-number">
                <h2>第十四条</h2>
              </div>
              <div>
                <p>ウィンズの運営資金は会費から徴収する運営資金と演奏活動収益金をもってこれに充てる。</p>
              </div>
              <div className="list-number-second">
                <h2>二</h2>
              </div>
              <div>
                <p>運営資金の会計年度は毎年３月１日から翌年２月末までとし、総会にて決算報告をするものとする。</p>
              </div>
              <div className="list-number-third">
                <h2>三</h2>
              </div>
              <div>
                <p>会計監査を設置し、会計の実施した出納に関して監査を行うものとする。</p>
              </div>
            </div>
            <div className="provision">
              <div className="sub-title">
                <h3>演奏</h3>
              </div>
              <div className="list-number">
                <h2>第十五条</h2>
              </div>
              <div>
                <p>ウィンズは次の場合に演奏する。</p>
                <p>ただし会員の都合等で演奏不能と代表が認めた場合はこの限りではない。</p>
                <ol>
                  <li>
                    <span>一</span>ウィンズの定期演奏会および各種演奏会。
                  </li>
                  <li>
                    <span>二</span>公共的諸行事で演奏の依頼を受けたとき。
                  </li>
                  <li>
                    <span>三</span>代表が特に必要と認めるとき。
                  </li>
                </ol>
              </div>
            </div>
            <div className="provision">
              <div className="sub-title">
                <h3>演奏中の心得</h3>
              </div>
              <div className="list-number">
                <h2>第十六条</h2>
              </div>
              <div>
                <p>会員は演奏するとき次の事項を守らねばならない。</p>
                <ol>
                  <li>
                    <span>一</span>代表の命に従い、規律ある団体行動をすること。
                  </li>
                  <li>
                    <span>二</span>容姿を端正にし品位の保持に努めること。
                  </li>
                </ol>
              </div>
            </div>
            <div className="provision">
              <div className="sub-title">
                <h3>会議</h3>
              </div>
              <div className="list-number">
                <h2>第十七条</h2>
              </div>
              <div>
                <p>
                  会議は総会および特別会とし、総会は年一回の定例会の他必要に応じて開催し、特別会は必要の都度代表が指名したものを招集し開催する。
                </p>
              </div>
              <div className="list-number-second">
                <h2>二</h2>
              </div>
              <div>
                <p>総会は在籍会員の過半数の出席(委任状含む)がなければ開催することができない。</p>
              </div>
              <div className="list-number-third">
                <h2>三</h2>
              </div>
              <div>
                <p>会議の議長は、会議ごとに、出席した会員の中から選任する。</p>
              </div>
            </div>
            <div className="provision">
              <div className="sub-title">
                <h3>入会手続き</h3>
              </div>
              <div className="list-number">
                <h2>第十八条</h2>
              </div>
              <div>
                <p>ウィンズの入会を希望するものは代表にその旨届出、受理されたのち会員となる。</p>
                <p>入会希望届の管理、届出の受理および処理について事務局長がこれを担当する。</p>
              </div>
              <div className="list-number-second">
                <h2>二</h2>
              </div>
              <div>
                <p>入会したものはすみやかにザ・ウィンド・アンサンブル会員名簿に登載される。</p>
              </div>
            </div>
            <div className="provision">
              <div className="sub-title">
                <h3>入会資格</h3>
              </div>
              <div className="list-number">
                <h2>第十九条</h2>
              </div>
              <div>
                <p>
                  ウィンズの入会資格は長岡市内に居住または、関係のある者で、満十八歳以上(高校生を除く)の者でなければならない。ただし、ウィンズの編成等により特に代表が必要と認めた場合はこの限りではない。
                </p>
              </div>
            </div>
            <div className="provision">
              <div className="sub-title">
                <h3>簿冊</h3>
              </div>
              <div className="list-number">
                <h2>第二十条</h2>
              </div>
              <div>
                <p>ウィンズに次の簿冊を備える。</p>
                <ol>
                  <li>
                    <span>一</span>ザ・ウィンド・アンサンブル会員名簿
                  </li>
                  <li>
                    <span>二</span>備品台帳
                  </li>
                  <li>
                    <span>三</span>楽譜台帳
                  </li>
                  <li>
                    <span>四</span>出納簿
                  </li>
                </ol>
              </div>
            </div>
            <div className="provision">
              <div className="sub-title">
                <h3>規約の改正</h3>
              </div>
              <div className="list-number">
                <h2>第二十一条</h2>
              </div>
              <div>
                <p>この規約を改正しようとするときは、総会出席会員の過半数(委任状含む)の賛成を得なければならない。</p>
              </div>
            </div>
            <div className="supplementary-provision">
              <h2>付則</h2>
              <ol>
                <li>この規約は、昭和６２年１１月１日より施行する。</li>
                <li>この規約は、平成２３年３月２１日より改制する。</li>
                <li>この規約は、平成３０年３月１７日より改制する。</li>
                <li>この規約は、平成３１年３月９日より改制する。</li>
                <li>この規約は、令和元年１２月９日より改制する。</li>
              </ol>
            </div>
          </div>
        </div>

        <div className={'box' + lib.pcClass(this.props.pc)}>
          <div className="back-link">
            <ul>
              <li>
                <Link to="/setting">
                  <div className="inner">
                    <Back />
                    <span>戻る</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(About)
