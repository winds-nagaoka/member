import request from 'superagent'

export function post (url, send, callback) {
  request.post(url)
    .type('form')
    .send(send)
    .end((error, response) => {
      return callback(error, response)
    })
}

export function countUp (send) {
  request.post('https://app.winds-n.com/api/count')
    .type('form')
    .send(send)
    .end((error, response) => {
      return
    })
}