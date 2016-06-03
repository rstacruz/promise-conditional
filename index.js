var assign = Object.assign

module.exports = function ifever (condition) {
  function then (fn) {
    return assign({}, this, push(this, ['then', fn]))
  }
  
  function katch (fn) {
    return assign({}, this, push(this, ['catch', fn]))
  }

  function push (self, item) {
    return { [self.mode]: self[self.mode].concat([ item ]) }
  }

  function else_ () {
    return assign({}, this, { mode: 'falseSteps' })
  }

  function endif () {
    var self = this
    return function (value) {
      var promise = Promise.resolve(value)
      return promise.then(condition)
      .then(function (conditionValue) {
        if (conditionValue) {
          return applySteps(Promise.resolve(value), self.trueSteps)
        } else {
          return applySteps(Promise.resolve(value), self.falseSteps)
        }
      })
    }
  }

  return {
    trueSteps: [],
    falseSteps: [],
    mode: 'trueSteps',
    then: then,
    catch: katch,
    else: else_,
    endif: endif
  }
}

function applySteps (promise, steps) {
  return steps.reduce(function (promise, step) {
    var method = step[0]
    var fn = step[1]
    return promise[method](fn)
  }, promise)
}
