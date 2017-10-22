const express = require('express')
const app = express()
const http = require('http')

app.set('port', process.env.PORT || 1111)
app.get('/', pageLoader)

function pageLoader (req, res) {
  if (req.query.message && req.query.message !== '') {
    res.send(`Found this message: ${req.query.message}`)
  } else if (req.query.callback && req.query.callback !== '') {
    http.get('http://httpbin.org/ip', response => {
      res.send(`Server responded with status code: ${response.statusCode}`)
    })
      .on('error', e => {
        res(e)
      })
  } else {
    res.send('No message found.')
  }
}

app.listen(app.get('port'), () => {
  console.log(`Your app is listening on port ${app.get('port')}.`)
})
