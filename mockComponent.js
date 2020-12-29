var AutoCompleteComponent = require('./src/autocomplete/component')

global.beforeEach(function () {
  AutoCompleteComponent.prototype.listener = new EventTarget()
})
