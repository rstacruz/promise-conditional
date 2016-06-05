# promise-conditional

> Use if-then-else in promise chains

```js
getArticles()
  .then(condition()
    .if(data => data.length > 10)
      .then(doIfTrue)
    .elseIf(data => data.length > 5)
      .then(doIfTrue)
    .else()
      .then(doIfFalse)
    .end())
```

## API

### condition
> `condition()`

Starts a condition chain.

### if

> `condition().if(condition)`

Starts an `if` step. `condition` is a function that gets the input value. If it returns true, the subsequent `then`/`catch`/`finally` calls will be invoked.

### elseIf

> `condition().elseIf(condition)`

Starts an `elseIf` step. `condition` is a function that gets the input value. If it returns true, the subsequent `then`/`catch`/`finally` calls will be invoked, but only if the other `if` steps have not been invoked.

### else

> `condition().else()`

Starts an `else` step. The subsequent `then`/`catch`/`finally` calls will be invoked, but only if the other `if`/`elseIf` steps have not been invoked.

### end

> `condition() ... end()`

Returns a function that you can pass onto `.then(...)` that runs the entire chain.

## Thanks


