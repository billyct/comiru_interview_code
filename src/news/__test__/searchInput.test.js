/* jshint ignore:start */
require('@testing-library/jest-dom/extend-expect')
const {fireEvent} = require('@testing-library/dom')

const ComponentFunc = require('../../common/component')
const acEvents = require('../../autocomplete/events')
const SearchInputFunc = require('../searchInput')
const classes = require('../classes')
const events = require('../events')

let SearchInput

beforeEach(() => {
  SearchInput = SearchInputFunc(ComponentFunc())
  initMockHTML()
})

afterEach(() => {
  document.body.innerHTML = ''
})

function initMockHTML() {
  document.body.innerHTML = `
  <div id="search-ipt"/>
  `
}

describe(`test SearchInput Component's constructor`, () => {
  it('should be correct', () => {
    const ipt = new SearchInput()
    expect(ipt.root).toBeInstanceOf(Element)
    expect(typeof ipt.ac).toBe('object')
  })
})

describe(`test SearchInput Component's handleShowMenu method`, () => {
  it('should call handleShowMenu method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(SearchInput.prototype, 'handleShowMenu').mockImplementation(mockCallback)

    const ipt = new SearchInput()
    ipt.trigger(acEvents.onShowMenu)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it('should add acContainerShowMenu class to this.ac.root', () => {
    const ipt = new SearchInput()
    ipt.trigger(acEvents.onShowMenu)

    expect(ipt.ac.root).toHaveClass(classes.acContainerShowMenu)
  })
})

describe(`test SearchInput Component's handleHideMenu method`, () => {
  it('should call handleHideMenu method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(SearchInput.prototype, 'handleHideMenu').mockImplementation(mockCallback)

    const ipt = new SearchInput()
    ipt.trigger(acEvents.onHideMenu)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it(`should remove acContainerShowMenu class to this.ac.root`, () => {
    const ipt = new SearchInput()
    ipt.trigger(acEvents.onHideMenu)
    expect(ipt.ac.root).not.toHaveClass(classes.acContainerShowMenu)
  })
})

describe(`test SearchInput Component's handleChange method`, () => {
  it('should call handleChange method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(SearchInput.prototype, 'handleChange').mockImplementation(mockCallback)

    const ipt = new SearchInput()
    ipt.trigger(acEvents.onChange)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it(`should trigger onSearch event`, () => {
    const ipt = new SearchInput()
    const mockCallback = jest.fn()
    ipt.on(events.onSearch, mockCallback)
    const valueChanged = 'whatever'
    ipt.trigger(acEvents.onChange, valueChanged)

    expect(mockCallback).toBeCalledTimes(1)
    expect(mockCallback.mock.calls[0][0].detail.value).toBe(valueChanged)
  })
})

describe(`test SearchInput Component's handleSearchInput method`, () => {
  it('should call handleSearchInput method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(SearchInput.prototype, 'handleSearchInput').mockImplementation(mockCallback)

    const event = randomElement([
      events.onSearchInput,
      acEvents.onPressEnter
    ])

    const ipt = new SearchInput()
    ipt.trigger(event)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it(`should trigger onSearch event with the input value`, () => {
    const ipt = new SearchInput()
    const valueChanged = 'whatever'
    ipt.root.querySelector('input').value = valueChanged

    const mockCallback = jest.fn()
    ipt.on(events.onSearch, mockCallback)
    ipt.trigger(events.onSearchInput)

    expect(mockCallback).toBeCalledTimes(1)
    expect(mockCallback.mock.calls[0][0].detail.value).toBe(valueChanged)
  })
})


