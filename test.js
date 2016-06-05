var condition = require('./index')
var test = require('blue-tape')

function add (b) {
  return function (a) {
    return a + b
  }
}

test('if true', function (t) {
  return Promise.resolve(1)
    .then(condition()
      .if(data => data === 1)
        .then(add(10))
      .end())
    .then(add(100))
    .then(result => t.equal(result, 111))
})

test('if false', function (t) {
  return Promise.resolve(1)
    .then(condition()
      .if(data => data !== 1)
        .then(add(10))
      .end())
    .then(add(100))
    .then(result => t.equal(result, 101))
})

test('if else', function (t) {
  return Promise.resolve(1)
    .then(condition()
      .if(data => data !== 1)
        .then(add(10))
      .else()
        .then(add(20))
      .end())
    .then(add(100))
    .then(result => t.equal(result, 121))
})

