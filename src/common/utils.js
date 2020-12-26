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


/**
 * simple function create an element
 *
 * @param {string} tagName
 * @param {string} classname
 * @returns {HTMLElement}
 */
function createElement(tagName, classname) {
  var node = document.createElement(tagName)
  node.className = classname

  return node
}

/**
 * query the node in contextNode with classname and text
 *
 * @param {Node} contextNode
 * @param {string} classname
 * @param {string} text
 * @returns {Node}
 */
function queryWithClassnameAndText(contextNode, classname, text) {
  var xpath = '//span[contains(@class, "' + classname + '") and normalize-space(text()) = "' + text + '"]'
  return document.evaluate(xpath, contextNode).iterateNext()
}

exports.mixin = mixin
exports.createElement = createElement
exports.queryWithClassnameAndText = queryWithClassnameAndText
