var condition = require('./index')
var test = require('blue-tape')

function add (b) {
  return function (a) {
    return a + b
  }
}

function isTrue () {
  return true
}

function isFalse () {
  return false
}

test('if true', function (t) {
  return Promise.resolve(1)
    .then(condition()
      .if(isTrue)
        .then(add(10))
      .end())
    .then(add(100))
    .then(result => t.equal(result, 111))
})

test('if false', function (t) {
  return Promise.resolve(1)
    .then(condition()
      .if(isFalse)
        .then(add(10))
      .end())
    .then(add(100))
    .then(result => t.equal(result, 101))
})

test('if else', function (t) {
  return Promise.resolve(1)
    .then(condition()
      .if(isFalse)
        .then(add(10))
      .else()
        .then(add(20))
      .end())
    .then(add(100))
    .then(result => t.equal(result, 121))
})

test('if/else-if/else - if', function (t) {
  return Promise.resolve(1)
    .then(condition()
      .if(isTrue)
        .then(add(10))
      .elseIf(isFalse)
        .then(add(20))
      .else()
        .then(add(40))
      .end())
    .then(add(100))
    .then(result => t.equal(result, 111))
})

test('if/else-if/else - else if', function (t) {
  return Promise.resolve(1)
    .then(condition()
      .if(isFalse)
        .then(add(10))
      .elseIf(isTrue)
        .then(add(20))
      .else()
        .then(add(40))
      .end())
    .then(add(100))
    .then(result => t.equal(result, 121))
})

test('if/else-if/else - trap handled', function (t) {
  return Promise.resolve(1)
    .then(condition()
      .if(isTrue)
        .then(add(10))
      .elseIf(isTrue)
        .then(add(20))
      .else()
        .then(add(40))
      .end())
    .then(add(100))
    .then(result => t.equal(result, 111))
})

test('if/else-if/else - else', function (t) {
  return Promise.resolve(1)
    .then(condition()
      .if(data => data !== 1)
        .then(add(10))
      .elseIf(data => data !== 1)
        .then(add(20))
      .else()
        .then(add(40))
      .end())
    .then(add(100))
    .then(result => t.equal(result, 141))
})

test('passthru', function (t) {
  return Promise.resolve(1)
    .then(condition().end())
    .then(add(100))
    .then(result => t.equal(result, 101))
})

test('.then() with no steps', function (t) {
  t.throws(function () {
    return Promise.resolve(1)
      .then(condition().then(function () {}).end())
      .then(add(100))
      .then(result => t.equal(result, 101))
  }, /no steps/)
  t.end()
})

test('eslint', require('eslint-engine/tape')())
