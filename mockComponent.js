var AutoCompleteComponent = require('./src/autocomplete/component')
var utils = require('./src/common/utils')

global.beforeEach(function () {
  utils.mixin(AutoCompleteComponent, {
    listener: new EventTarget(),
  })
})
