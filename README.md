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

[![Status](https://travis-ci.org/rstacruz/promise-conditional.svg?branch=master)](https://travis-ci.org/rstacruz/promise-conditional "See test builds")

## API

### condition
> `condition()`

Starts a condition chain.

### if

> `condition().if(condition)`

Starts an `if` step. `condition` is a function that gets the input value. If it returns true, the subsequent `then`/`catch`/`finally` calls will be invoked.

### elseIf

> `condition() ... elseIf(condition)`

Starts an `elseIf` step. `condition` is a function that gets the input value. If it returns true, the subsequent `then`/`catch`/`finally` calls will be invoked, but only if the other `if` steps have not been invoked.

### else

> `condition() ... else()`

Starts an `else` step. The subsequent `then`/`catch`/`finally` calls will be invoked, but only if the other `if`/`elseIf` steps have not been invoked.

### end

> `condition() ... end()`

Returns a function that you can pass onto `.then(...)` that runs the entire chain.

### then/catch/finally

> `condition().if().then(next)`

Adds a `then`/`catch`/`finally` step if the last `if` condition is true.

## Thanks

**promise-conditional** © 2016+, Rico Sta. Cruz. Released under the [MIT] License.<br>
Authored and maintained by Rico Sta. Cruz with help from contributors ([list][contributors]).

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[MIT]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/promise-conditional/contributors
