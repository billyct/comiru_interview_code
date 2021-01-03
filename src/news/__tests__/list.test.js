/* jshint ignore:start */
require('@testing-library/jest-dom/extend-expect')

const ComponentFunc = require('../../common/component')
const ListFunc = require('../list')
const events = require('../events')

let List

beforeEach(() => {
  List = ListFunc(ComponentFunc())
  initMockHTML()
})

afterEach(() => {
  document.body.innerHTML = ''
})

function initMockHTML() {
  document.body.innerHTML = `
  <div id="news-list"></div>
  <script id="template-news-item" type="text/template">
    <div>{{v}}</div>
  </script>
  `
}

describe(`test List Component's constructor`, () => {
  it('should be correct', () => {
    const list = new List()

    expect(list.root).toBeInstanceOf(Element)
    expect(typeof list.template).toBe('string')
    expect(typeof list.lazy).toBe('object')
  })
})

describe(`test List Component's handleRefreshList method`, () => {
  it('should call handleRefreshList method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(List.prototype, 'handleRefreshList').mockImplementation(mockCallback)

    const list = new List()
    list.trigger(events.onRefreshList)

    expect(mockCallback).toBeCalledTimes(1)
    spy.mockRestore()
  })

  it('should call this.lazy.observer.disconnect', () => {
    const mockCallback = jest.fn()
    const list = new List()

    list.lazy = {
      observer: {
        disconnect: mockCallback,
      },
    }

    list.trigger(events.onRefreshList, [])

    expect(mockCallback).toBeCalledTimes(1)
  })

  it('should set the root node to be empty', () => {
    const list = new List()
    list.trigger(events.onRefreshList, [])
    expect(list.root).toBeEmptyDOMElement()
  })

  it('should call _appendList method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(List.prototype, '_appendList').mockImplementation(mockCallback)

    const eventValue = 'whatever'
    const list = new List()
    list.trigger(events.onRefreshList, eventValue)

    expect(mockCallback).toBeCalledTimes(1)
    expect(mockCallback).toBeCalledWith(eventValue)

    spy.mockRestore()
  })

  it('should render correctly', () => {
    const list = new List()
    list.root.innerHTML = '<div>c</div>'
    list.trigger(events.onRefreshList, [{v: 'a'}, {v: 'b'}])

    expect(list.root).toContainHTML('<div>a</div>')
    expect(list.root).toContainHTML('<div>b</div>')
    expect(list.root).not.toContainHTML('<div>c</div>')
  })
})

describe(`test List Component's handleAppendList method`, () => {
  it('should call handleAppendList method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(List.prototype, 'handleAppendList').mockImplementation(mockCallback)

    const list = new List()
    list.trigger(events.onAppendList)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it('should call _appendList method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(List.prototype, '_appendList').mockImplementation(mockCallback)

    const eventValue = 'whatever'
    const list = new List()
    list.trigger(events.onAppendList, eventValue)

    expect(mockCallback).toBeCalledTimes(1)
    expect(mockCallback).toBeCalledWith(eventValue)

    spy.mockRestore()
  })

  it('should render correctly', () => {
    const list = new List()
    list.root.innerHTML = '<div>c</div>'
    list.trigger(events.onAppendList, [{v: 'a'}, {v: 'b'}])

    expect(list.root).toContainHTML('<div>a</div>')
    expect(list.root).toContainHTML('<div>b</div>')
    expect(list.root).toContainHTML('<div>c</div>')
  })
})
