## If-then-else

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

## Switch-case

```js
getArticles()
  .then(condition()
    .switch(res => res.date)
    .case('monday')
      .then(doIfMonday)
    .case('tuesday')
      .then(doIfTuesday)
    .else()
      .then(doIfFalse)
    .end())
```
