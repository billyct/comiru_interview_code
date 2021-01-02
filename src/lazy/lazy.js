var utils = require('../common/utils')
var html = require('../common/html')

var mixin = utils.mixin
var getElementList = html.getElementList

function LazyFunc(opts) {

  function Lazy(){
    this.opts = opts || {}

    var observer
    if (this.support('IntersectionObserver')) {
      observer = new IntersectionObserver(this.handleIntersectionObserve.bind(this))
    }

    this.observer = observer
  }

  mixin(Lazy, {

    /**
     * observe the elements
     *
     * @param {Element|NodeList|string} el
     */
    observe: function (el) {
      var nodes = getElementList(el)
      for(var i = 0; i < nodes.length; i++ ) {
        if (this.isLoaded(nodes[i])) {
          continue
        }

        if (this.observer) {
          this.observer.observe(nodes[i])
          continue
        }

        this.load(nodes[i])
        this.markAsLoaded(nodes[i])
        this.loaded(nodes[i])
      }
    },

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
            self.loaded(entry.target)
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
    },

    /**
     * check if support type feature
     *
     * @param {string} type
     * @returns {Window}
     */
    support: function (type) {
      return window && window[type]
    },

    /**
     * @param {Element} node
     */
    loaded: function (node) {
      if (this.opts.onLoaded) {
        this.opts.onLoaded(node)
      }
    }
  })

  return Lazy
}

module.exports = LazyFunc
