# AutoComplete Component

an auto-complete tag widget, support single/multi selection

## How To Use

```js
AutoComplete('#el', {
    options: ['a', 'b', 'c'],
    // single or multi select
    single: true,
    onChange: function (e) {
      console.log(e.detail.value)
    },
    // when menu item removed
    onRemoveMenuItem: function (e) {
      console.log(e.detail.value)
    }
})
```
