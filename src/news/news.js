var utils = require('../common/utils')
var SearchButtonFunc = require('./searchButton')
var SearchInputFunc = require('./searchInput')
var NextFunc = require('./next')
var ListFunc = require('./list')
var DataFunc = require('./data')
var events = require('./events')

var mixin = utils.mixin

function NewsFunc(Component) {

  var SearchButton = SearchButtonFunc.apply(this, arguments)
  var SearchInput = SearchInputFunc.apply(this, arguments)
  var Next = NextFunc.apply(this, arguments)
  var List = ListFunc.apply(this, arguments)
  var Data = DataFunc.apply(this, arguments)

  function News() {

    this.data = new Data()

    new SearchInput()
    new SearchButton()
    new List()
    new Next()

    // first render
    this.trigger(events.onRefreshList, this.data.get())

    this.on(events.onSearch, this.handleSearch.bind(this))
    this.on(events.onNext, this.handleNext.bind(this))
  }

  mixin(News, Component, {
    handleSearch: function (e) {
      var data = this.data.search(e.detail.value)
      this.trigger(events.onRefreshList, data)
    },

    handleNext: function () {
      var data = this.data.next()
      this.trigger(events.onAppendList, data)
    }
  })

  return News
}

module.exports = NewsFunc
