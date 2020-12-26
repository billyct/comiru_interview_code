var utils = require('./utils')
var mixin = utils.mixin

var ComponentFunc = function () {

  // global event listener
  var listener = new EventTarget()

  function Component() {}

  mixin(Component, {

    // for listen events
    listener: listener,

    callbackMap: {},

    /**
     * listen event for Component
     *
     * @param {string} eventType
     * @param {ComponentEventCallback} callback
     */
    on: function (eventType, callback) {
      this.callbackMap[eventType] = callback
      this.listener.addEventListener(eventType, callback)
    },

    /**
     * trigger event for Component
     * arguments[1] is the value to send
     *
     * @param {string} eventType
     */
    trigger: function (eventType) {

      var data = {}
      if (arguments.length > 1) {
        data = {
          detail: {
            value: arguments[1],
          },
        }
      }

      // dispatch onChange event
      var event = new CustomEvent(eventType, data)
      // stopPropagation()
      event.cancelBubble = true

      this.listener.dispatchEvent(event)
    },

    /**
     * remove event for Component
     *
     * @param {string} eventType
     */
    off: function (eventType) {
      var cb = this.callbackMap[eventType]
      if (cb) {
        this.listener.removeEventListener(eventType, cb)
        delete this.callbackMap[eventType]
      }
    }
  })

  return Component
}

module.exports = ComponentFunc
