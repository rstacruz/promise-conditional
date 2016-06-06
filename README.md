# promise-conditional

> Use if-then-else in promise chains

```js
getArticles()
  .then(conditional()
    .if(data => data.length > 10)
      .then(doIfTrue)
      .then(alsoDoIfTrue)
    .elseIf(data => data.length > 5)
      .then(doIfTrue)
    .else()
      .then(doIfFalse)
    .end())
```

[![Status](https://travis-ci.org/rstacruz/promise-conditional.svg?branch=master)](https://travis-ci.org/rstacruz/promise-conditional "See test builds")

## Install

```
npm install --save promise-conditional
```

```js
var conditional = require('promise-conditional')  // Legacy
import conditional from 'promise-conditional'     // ES2015+
```

It relies on [any-promise](https://www.npmjs.com/package/any-promise) to find a Promise library. You can use [bluebird](https://www.npmjs.com/package/bluebird), [q](https://www.npmjs.com/package/q), [when](https://www.npmjs.com/package/when), or the native `Promise` implementation of Node.js or the browser.

## API

### conditional
> `conditional()`

Starts a condition chain. This is exported via `require('promise-conditional')`.

### if

> `conditional().if(condition)`

Starts an `if` step. `condition` is a function that gets the input value. If it returns true, the subsequent `then`/`catch`/`finally` calls will be invoked.

### elseIf

> `conditional() ... elseIf(condition)`

Starts an `elseIf` step. `condition` is a function that gets the input value. If it returns true, the subsequent `then`/`catch`/`finally` calls will be invoked, but only if the other `if` steps have not been invoked.

### else

> `conditional() ... else()`

Starts an `else` step. The subsequent `then`/`catch`/`finally` calls will be invoked, but only if the other `if`/`elseIf` steps have not been invoked.

### end

> `conditional() ... end()`

Returns a function that you can pass onto `.then(...)` that runs the entire chain.

### then/catch/finally

> `conditional().if().then(next)`

Adds a `then`/`catch`/`finally` step if the last `if` condition is true.

## Thanks

**promise-conditional** © 2016+, Rico Sta. Cruz. Released under the [MIT] License.<br>
Authored and maintained by Rico Sta. Cruz with help from contributors ([list][contributors]).

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[MIT]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/promise-conditional/contributors
