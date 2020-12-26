/**
 * simple [object Function] implement [object Function] and extend [object Object]
 *
 * @param {function} target
 */
function mixin(target) {
  var name, options,
    i = 1

  for (; i < arguments.length; i++) {
    options = arguments[i]

    if (Object.prototype.toString.call(options) === '[object Object]') {
      // deal with plain object
      for (name in options) {
        if (options.hasOwnProperty(name)) {
          target.prototype[name] = options[name]
        }
      }

    } else if (Object.prototype.toString.call(options) === '[object Function]') {
      // deal with function object
      target.prototype = Object.create(options.prototype)
    }
  }

  target.prototype.constructor = target
}

exports.mixin = mixin
