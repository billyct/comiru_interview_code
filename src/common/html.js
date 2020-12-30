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
 * @param {Element} contextNode
 * @param {QuerySelectorOption} opts
 * @returns {Node}
 */
function querySelector(contextNode, opts) {
  var nodes = contextNode.querySelectorAll('.' + opts.className)
  nodes = Array.from(nodes)
  if (opts.textContent) {
    nodes = nodes.filter(function (node) {
      return node.textContent === opts.textContent
    })
  }

  var index = 0
  if (opts.index) {
    index = opts.index - 1
  }

  return nodes[index] || null
}

/**
 * get element by string or element
 *
 * @param {Element|string} el
 * @returns {Element}
 */
function getElement(el) {
  if (el instanceof Element) {
    return el
  }

  return document.querySelector(el)
}

/**
 * get elements
 *
 * @param {Element|NodeList|string} el
 * @returns {NodeList|Element[]}
 */
function getElementList(el) {
  if (el instanceof Element) {
    return [el]
  }

  if (el instanceof NodeList) {
    return el
  }

  return document.querySelectorAll(el)
}

exports.createElement = createElement
exports.querySelector = querySelector
exports.getElement = getElement
exports.getElementList = getElementList
