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
    end: msg => {
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
    end: msg => {
      t.is(msg, 'No message found.')
      t.end()
    }
  }
  pageLoader(req, res)
})

test.cb('page loader should make a http call', t => {
  const stub = sinon.stub(http, 'get').callsFake(() => {
    t.true(stub.calledOnce)
    t.end()
    return {
      on: () => {}
    }
  })

  pageLoader({ query: { callback: 'callMe' } }, {})
})
