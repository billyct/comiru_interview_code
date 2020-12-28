/**
 * simple function create an element with className
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
 * query the node with xpath
 *
 * example:
 *        querySelector(document, {
 *          className: 'span_classname',
 *          textContent: 'text in the node',
 *          // 1 for the first
 *          index: 1,
 *        })
 *
 * @param {Node} contextNode
 * @param {QuerySelectorOption} opts
 * @returns {Node}
 */
function querySelector(contextNode, opts) {

  var conditions = [
    'contains(@class, "' + opts.className + '")',
  ]

  if (opts.textContent) {
    conditions.push('normalize-space(text()) = "' + opts.textContent + '"')
  }

  var xpath = '//*[' + conditions.join(' and ') + ']'

  if (opts.index) {
    xpath += '[' + opts.index + ']'
  }

  return document.evaluate(xpath, contextNode, null, XPathResult.ANY_TYPE, null).iterateNext()
}

exports.createElement = createElement
exports.querySelector = querySelector
