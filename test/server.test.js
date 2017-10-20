import test from 'ava'
import rewire from 'rewire'

const server = rewire('../server')
const pageLoader = server.__get__('pageLoader')

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
