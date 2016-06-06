var assign = require('object-assign')
var Promise = require('any-promise')

module.exports = function conditional () {
  function end () {
    var self = this
    return function (value) {
      var state = { handled: false }
      return self.steps.reduce(applyStep(state, value), Promise.resolve(value))
    }
  }

  return {
    steps: [], // [ { condition: fn, consequence: fn }, ... ]
    then: function (fn) { return addConsequence(this, 'then', fn) },
    catch: function (fn) { return addConsequence(this, 'catch', fn) },
    finally: function (fn) { return addConsequence(this, 'finally', fn) },
    if: function (cond) { return addStep(this, cond) },
    elseIf: function (cond) { return addStep(this, cond) },
    else: function (cond) { return addStep(this, getTrue) },
    end: end
  }
}

/*
 * Adds a new step to `this.steps`.
 * Each `if` / `elseIf` / `else` is a step, and each step has its own
 * `condition` (what's passed to *if(...)*) and `consequence` (the chain of
 * `then(...)`s).
 */

function addStep (self, condition) {
  var steps = push(self.steps, {
    condition: condition,
    consequence: identity
  })

  return assign({}, self, { steps: steps })
}

/*
 * Chains a new consequence to the last `this.steps[-1].consequence`.
 * The consequence is always a single function; it uses `chain()` to tack
 * on new consequences after the last.
 */

function addConsequence (self, key, fn) {
  var step = last(self.steps)
  if (!step) throw new Error('promise-conditional: ' + key + '(): no steps defined yet')

  var steps = replaceLast(self.steps, {
    condition: step.condition,
    consequence: chain(step.consequence, key, fn)
  })

  return assign({}, self, { steps: steps })
}

/*
 * Runs a step's `condition`, and if it gives true, run its `consequence`.
 * `last` is the result of the last step (a promise).
 */

function applyStep (state, value) {
  return function (last, step) {
    return last.then(function (d) {
      if (state.handled) return d
      return Promise.resolve(step.condition(value))
        .then(function (conditionValue) {
          if (conditionValue) {
            state.handled = true
            return step.consequence(value)
          } else {
            return value
          }
        })
    })
  }
}

/*
 * helpers
 */

function identity (value) {
  return Promise.resolve(value)
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
 *    function last () {
 *      return Promise.resolve('foobar')
 *    }
 *
 *    newFn = chain(last, 'then', fn)
 *    // returns: (d) => last(d).then(fn)
 *
 *    Promise.resolve(...).then(newFn)
 *
 */

function chain (last, key, fn) {
  return function (d) {
    return last(d)[key](fn)
  }
}
