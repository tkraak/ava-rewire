import test from 'ava'
import rewire from 'rewire'
import sinon from 'sinon'

const server = rewire('../server')
const pageLoader = server.__get__('pageLoader')
const http = server.__get__('http')

test.cb('page loader should return the `message` query string', t => {
  const req = {
    query: {
      message: 'hi tester'
    }
  }
  const res = {
    send: msg => {
      t.is(msg, 'Found this message: hi tester')
      t.end()
    }
  }
  pageLoader(req, res)
})

test.cb('page loader should return no message found', t => {
  const req = {
    query: {}
  }
  const res = {
    send: msg => {
      t.is(msg, 'No message found.')
      t.end()
    }
  }
  pageLoader(req, res)
})

test.cb("page loader invokes http's get method", t => {
  const get = sinon.stub(http, 'get').callsFake((url, callback) => {
    callback(response)
    t.true(get.calledOnce)
    get.restore()
    return {
      on: () => {}
    }
  })
  const response = {
    statusCode: 200
  }
  const req = {
    query: {
      callback: 'callMe'
    }
  }
  const res = {
    send: msg => {
      t.is(msg, 'Server responded with status code: 200')
      t.end()
    }
  }

  pageLoader(req, res)
})
