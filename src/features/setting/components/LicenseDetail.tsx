import { ContentsBox, Text } from '../../../components/ContentsBox'
import { ReactComponent as Logo } from '../../../assets/hr.svg'
// import { ReactComponent as ReactIcon } from '../../../assets/react.svg'
// import { ReactComponent as NodejsIcon } from '../../../assets/nodejs.svg'
// import { ReactComponent as HTMLIcon } from '../../../assets/html.svg'
// import { ReactComponent as CSSIcon } from '../../../assets/css.svg'
// import { ReactComponent as JavaScriptIcon } from '../../../assets/javascript.svg'
import { VERSION } from '../../../config'
import styles from './LicenseDetail.module.scss'

export const LicenseDetail = () => {
  return (
    <ContentsBox>
      <div className={styles.license}>
        <div className={styles['app-version']}>
          <div>
            <Logo />
          </div>
          <div>
            <div className={styles['app-title']}>
              <span>会員専用アプリ</span>
            </div>
            <div className={styles['app-version-number']}>
              <span>
                <span>Version</span>
                <span>{VERSION}</span>
              </span>
            </div>
          </div>
        </div>

        <Text>
          <p>Made for The Wind Ensemble members.</p>
          <p>This software is made possible with the following open sources.</p>
          <p>Thank the open source community for all of their contributions.</p>
        </Text>

        {/* <div className={styles['license-detail']}>
          <h2>Application Dependencies</h2>
          <p className={styles.react}>
            <ReactIcon />
            Developed with React
          </p>
          <p>
            <span className={styles.react}>React</span>
            <span>version</span>
            <span>16.8.6</span>
          </p>
          <p>
            <span className={styles.redux}>Redux</span>
            <span>version</span>
            <span>4.0.1</span>
          </p>
          <p>
            <span className={styles.nodejs}>SuperAgent</span>
            <span>version</span>
            <span>3.8.2</span>
          </p>
          <h2>Server Dependencies</h2>
          <p className={styles['node-js']}>
            <NodejsIcon />
            Developed with Node.js
          </p>
          <p>
            <span className={styles.express}>Express</span>
            <span>version</span>
            <span>4.17.1</span>
          </p>
          <p>
            <span className={styles.nodejs}>NeDB</span>
            <span>version</span>
            <span>1.8.0</span>
          </p>
          <h2>Based Technologies</h2>
          <p>
            <HTMLIcon />
            HTML 5
          </p>
          <p>
            <CSSIcon />
            CSS 3
          </p>
          <p>
            <JavaScriptIcon />
            JavaScript (ECMAScript2018)
          </p>
        </div> */}
      </div>
    </ContentsBox>
  )
}
