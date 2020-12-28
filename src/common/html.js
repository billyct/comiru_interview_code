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

exports.createElement = createElement
exports.querySelector = querySelector
