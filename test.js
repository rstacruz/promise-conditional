var condition = require('./index')

function push (b) {
  return function (a) {
    return a + b
  }
}

var test = require('blue-tape')

test('if true', function (t) {
  return Promise.resolve(10)
    .then(condition()
      .if(data => data === 10)
        .then(push(20))
      .end())
    .then(push(30))
    .then(result => t.equal(result, 60))
})

test('if false', function (t) {
  return Promise.resolve(10)
    .then(condition()
      .if(data => data !== 10)
        .then(push(20))
      .end())
    .then(push(30))
    .then(result => t.equal(result, 40))
})

