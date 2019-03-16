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
// app.listen(3006)

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
app.use('/bbs/post', express.static(client))
app.use('/cast', express.static(client))
app.use('/record', express.static(client))
app.use('/reg', express.static(client))
app.use('/login', express.static(client))
app.use('/archive', express.static(client))
app.use('/archive/overview/:id', express.static(client))
app.use('/archive/photo/:id', express.static(client))
app.use('/archive/video/:id/:track', express.static(client))
app.use('/archive/video/:id', express.static(client))
app.use('/score', express.static(client))
app.use('/score/detail/:id', express.static(client))
app.use('/setting', express.static(client))
app.use('/setting/name', express.static(client))
app.use('/setting/email', express.static(client))
