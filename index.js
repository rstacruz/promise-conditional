var assign = require('object-assign')

module.exports = function conditional () {
  function end () {
    var self = this
    return function (value) {
      var handled
      return self.steps.reduce(function (last, step) {
        return last.then(function (d) {
          if (handled) return d
          return Promise.resolve(step.condition(value))
            .then(function (conditionValue) {
              if (conditionValue) {
                handled = true
                return step.consequence(value)
              } else {
                return value
              }
            })
        })
      }, Promise.resolve(value))
    }
  }

  return {
    steps: [], // [ { condition: fn, consequence: fn }, ... ]
    then: function (fn) { return addCondition(this, 'then', fn) },
    catch: function (fn) { return addCondition(this, 'catch', fn) },
    finally: function (fn) { return addCondition(this, 'finally', fn) },
    if: function (cond) { return addStep(this, cond) },
    elseIf: function (cond) { return addStep(this, cond) },
    else: function (cond) { return addStep(this, getTrue) },
    end: end
  }
}

/*
 * Delegates
 */

function addCondition (self, key, fn) {
  var step = last(self.steps)
  if (!step) throw new Error('promise-conditional: ' + key + '(): no steps defined yet')

  var consequence = chain(step.consequence, key, fn)

  var steps = replaceLast(self.steps, {
    condition: step.condition,
    consequence: consequence
  })

  return assign({}, self, { steps: steps })
}

function addStep (self, condition) {
  var steps = push(self.steps, {
    condition: condition,
    consequence: identity
  })

  return assign({}, self, { steps: steps })
}

/*
 * helpers
 */

function identity (value) {
  return value
}

function getTrue () {
  return true
}

function last (list) {
  return list[list.length - 1]
}

function exceptLast (list) {
  return list.slice(0, list.length - 1)
}

function replaceLast (list, item) {
  return push(exceptLast(list), item)
}

function push (list, item) {
  return list.concat([ item ])
}

/*
 * Adds to a function chain. The result of this can be chained again.
 *
 *    function last () { ... }
 *
 *    newFn = chain(last, 'then', fn)
 *    // returns: (d) => last(d).then(fn)
 *
 *    Promise.resolve(...).then(newFn)
 *
 */

function chain (last, key, fn) {
  if (last === identity) {
    return function (d) {
      // Optimization; not really needed.
      return Promise.resolve(d)[key](fn)
    }
  } else {
    return function (d) {
      return Promise.resolve(last(d))[key](fn)
    }
  }
}

