var when = require('./index')

function getArticles () {
  return Promise.resolve([ ])
}

function sortArticles (list) {
  return list.sort()
}


function push (item) {
  return function (list) {
    return list.concat([ item ])
  }
}

var test = require('blue-tape')

test('lol', function (t) {
  return Promise.resolve([])
    .then(when(data => data.length < 10)
        .then(push(100))
      .endif())
    .then(push(200))
    .then(result => t.deepEqual(result, [ 100, 200 ]))
})

test('lol', function (t) {
  return Promise.resolve([])
    .then(when(data => data.length > 10)
        .then(push(100))
      .endif())
    .then(push(200))
    .then(result => t.deepEqual(result, [ 200 ]))
})
