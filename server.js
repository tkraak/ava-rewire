const express = require('express')
const app = express()
const http = require('http')

app.get('/', pageLoader)

function pageLoader (req, res) {
  if (req.query.message && req.query.message !== '') {
    res.end(`Found this message: ${req.query.message}`)
  } else if (req.query.callback && req.query.callback !== '') {
    http.get('http://test.test', response => {
      res(response)
    })
      .on('error', e => {
        res(e)
      })
  } else {
    res.end('No message found.')
  }
}

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}.`)
})
