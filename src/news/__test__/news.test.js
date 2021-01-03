/* jshint ignore:start */
require('@testing-library/jest-dom/extend-expect')

const ComponentFunc = require('../../common/component')
const NewsFunc = require('../news')
const events = require('../events')

let News

beforeEach(() => {
  News = NewsFunc(ComponentFunc())
  initMockHTML()
})

afterEach(() => {
  document.body.innerHTML = ''
})

function initMockHTML() {
  document.body.innerHTML = `
  <div id="search-ipt"></div>
  <button id="search-btn"></button>
  <div id="news-list"></div>
  <button id="next-btn"></button>
  <script id="template-news-item" type="text/template">
    <div>{{v}}</div>
  </script>
  `
}

describe(`test News Component's constructor`, () => {
  it('should init correct', () => {

    const mockCallback = jest.fn()
    const spy = jest.spyOn(News.prototype, 'trigger').mockImplementation(mockCallback)

    const news = new News()

    expect(typeof news.data).toBe('object')
    expect(mockCallback).toBeCalledTimes(1)
    expect(mockCallback).toBeCalledWith(events.onRefreshList, [])

    spy.mockRestore()
  })
})

describe(`test News Component's handleSearch method`, () => {
  it('should call handleSearch method', () => {

    const mockCallback = jest.fn()
    const spy = jest.spyOn(News.prototype, 'handleSearch').mockImplementation(mockCallback)

    const news = new News()
    news.trigger(events.onSearch)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it('should trigger onRefreshList event', () => {
    const news = new News()
    const valueData = ['a', 'b']
    const mockSearch = jest.fn(() => valueData)
    news.data = {
      search: mockSearch,
    }

    const mockCallback = jest.fn()
    news.on(events.onRefreshList, mockCallback)

    const searchValue = 'whatever'
    news.trigger(events.onSearch, searchValue)

    expect(mockSearch).toBeCalledTimes(1)
    expect(mockSearch).toBeCalledWith(searchValue)

    expect(mockCallback).toBeCalledTimes(1)
    expect(mockCallback.mock.calls[0][0].detail.value).toEqual(valueData)
  })
})

describe(`test News Component's handleNext method`, () => {
  it('should call handleNext method', () => {

    const mockCallback = jest.fn()
    const spy = jest.spyOn(News.prototype, 'handleNext').mockImplementation(mockCallback)

    const news = new News()
    news.trigger(events.onNext)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it('should trigger onAppendList event', () => {
    const news = new News()
    const valueData = ['a', 'b']
    const mockNext = jest.fn(() => valueData)
    news.data = {
      next: mockNext,
    }

    const mockCallback = jest.fn()
    news.on(events.onAppendList, mockCallback)

    news.trigger(events.onNext)

    expect(mockNext).toBeCalledTimes(1)

    expect(mockCallback).toBeCalledTimes(1)
    expect(mockCallback.mock.calls[0][0].detail.value).toEqual(valueData)
  })
})

