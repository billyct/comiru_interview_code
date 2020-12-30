var utils = require('../common/utils')
var html = require('../common/html')

var mixin = utils.mixin
var getElementList = html.getElementList

function LazyFunc() {
  function Lazy(el){
    var observer = new IntersectionObserver(this.handleIntersectionObserve.bind(this))

    var nodes = getElementList(el)
    for(var i = 0; i < nodes.length; i++ ) {
      if (this.isLoaded(nodes[i])) {
        continue
      }

      observer.observe(nodes[i])
    }

    this.observer = observer
  }

  mixin(Lazy, {

    /**
     * @param {IntersectionObserverEntry[]} entries
     * @param {IntersectionObserver} observer
     */
    handleIntersectionObserve: function (entries, observer) {
      var self = this
      entries.forEach(function (entry) {
        if (entry.intersectionRatio > 0 || entry.isIntersecting) {
          observer.unobserve(entry.target)

          if (!self.isLoaded(entry.target)) {
            self.load(entry.target)
            self.markAsLoaded(entry.target)
          }
        }
      })
    },

    /**
     *
     * @param {Element} node
     */
    isLoaded: function (node) {
      return node.getAttribute('data-loaded') === 'true'
    },

    /**
     *
     * @param {Element} node
     */
    load: function (node) {
      if (node.getAttribute('data-src')) {
        node.src = node.getAttribute('data-src')
      }
    },

    /**
     *
     * @param {Element} node
     */
    markAsLoaded: function (node) {
      node.setAttribute('data-loaded', true)
    }
  })

  return Lazy
}

module.exports = LazyFunc
