var utils = require('../common/utils')
var events = require('./events')

var mixin = utils.mixin

function DataFunc(Component) {

  var opts = {}
  if (arguments.length > 1) {
    opts = arguments[1]
  }

  function Data() {
    this.data = opts.data || []

    // init result data
    this.result = []
    this.resultPerPage = 5
    this.resultPage = 1
  }

  mixin(Data, Component, {

    /**
     * next data
     * @returns {Object[]}
     */
    next: function () {
      var start = this.resultPerPage * (this.resultPage - 1)
      var end = start + this.resultPerPage

      var args = [start]
      if (end < this.result.length) {
        args.push(end)
        this.trigger(events.onShowNext)
      } else {
        this.trigger(events.onHideNext)
      }

      var data = this.result.slice.apply(this.result, args)

      this.resultPage += 1

      return data
    },

    /**
     * get data
     */
    get: function () {
      return this.search()
    },

    /**
     * search data
     *
     * @param {string?} text
     */
    search: function (text) {

      var data = this.data
      if (text) {
        data = data.filter(function (datum) {
          return datum.content.indexOf(text) >= 0 || datum.name.indexOf(text) >= 0
        })
      }

      this.result = data
      this.resultPage = 1

      return this.next()
    },
  })

  return Data
}

module.exports = DataFunc
