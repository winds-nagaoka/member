const express = require('express')
const app = express()

const version = require('project-version')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

// ライブラリの読み込み
const lib = require('./server/lib')

// HTTPを使用する(公開用)
const http = require('http')
app.listen(3001)

const compression = require('compression')
app.use(compression({
  threshold: 0,
  level: 9,
  memLevel: 9
}))

// クライアントアプリを返す
const client = './client/build'
app.use('/', express.static(client))
app.use('/practice', express.static(client))
app.use('/manager', express.static(client))
app.use('/bbs', express.static(client))
app.use('/cast', express.static(client))
app.use('/record', express.static(client))
app.use('/reg', express.static(client))
app.use('/login', express.static(client))
app.use('/archive', express.static(client))
app.use('/archive/overview/:id', express.static(client))
app.use('/score', express.static(client))
app.use('/score/detail/:id', express.static(client))

// app.use('/overview', express.static(client))
app.use('/overview/:id', express.static(client))
app.use('/jump/:id', express.static(client))
app.use('/photo/:id', express.static(client))
app.use('/video/:id', express.static(client))
app.use('/video/:id/:track', express.static(client))
app.use('/setting', express.static(client))
app.use('/setting/password', express.static(client))
app.use('/setting/delete', express.static(client))
app.use('/setting/license', express.static(client))
app.use('/setting/guide', express.static(client))
app.use('/setting/update', express.static(client))
app.use('/setting/history', express.static(client))
app.use('/tutorial', express.static(client))
app.use('/reg', express.static(client))
app.use('/login', express.static(client))

// api設定
app.post('/api/test', (req, res) => {
  const text = req.body.text
  console.log('[' + lib.showTime() + '] api/test: ' + text)
  res.json({status: true})
})
