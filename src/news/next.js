var utils = require('../common/utils')
var events = require('./events')

var mixin = utils.mixin

function NextFunc(Component) {
  function Next() {

    this.root = document.querySelector('#next-btn')

    this.root.addEventListener('click', this.handleClick.bind(this))

    this.on(events.onShowNext, this.handleShowNext.bind(this))
    this.on(events.onHideNext, this.handleHideNext.bind(this))
  }

  mixin(Next, Component, {
    handleClick: function () {
      // start loading
      this.trigger(events.onNext)
      // end loading
    },

    /**
     * show next
     */
    handleShowNext: function () {
      // @warning should be flex
      this.root.style.display = 'flex'
    },

    /**
     * hide next
     */
    handleHideNext: function () {
      this.root.style.display = 'none'
    }

  })

  return Next
}

module.exports = NextFunc
