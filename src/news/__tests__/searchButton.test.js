/* jshint ignore:start */
require('@testing-library/jest-dom/extend-expect')
const {fireEvent} = require('@testing-library/dom')

const ComponentFunc = require('../../common/component')
const acEvents = require('../../autocomplete/events')
const SearchButtonFunc = require('../searchButton')
const classes = require('../classes')
const events = require('../events')

let SearchButton

beforeEach(() => {
  SearchButton = SearchButtonFunc(ComponentFunc())
  initMockHTML()
})

afterEach(() => {
  document.body.innerHTML = ''
})

function initMockHTML() {
  document.body.innerHTML = `
  <button id="search-btn"/>
  `
}

describe(`test SearchButton Component's constructor`, () => {
  it('should be correct', () => {
    const btn = new SearchButton()
    expect(btn.root).toBeInstanceOf(Element)
  })
})

describe(`test SearchButton Component's handleClick method`, () => {
  it('should call handleClick method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(SearchButton.prototype, 'handleClick').mockImplementation(mockCallback)

    const btn = new SearchButton()

    fireEvent.click(btn.root)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it('should trigger onSearchInput event', () => {
    const btn = new SearchButton()

    const mockCallback = jest.fn()
    btn.on(events.onSearchInput, mockCallback)

    fireEvent.click(btn.root)

    expect(mockCallback).toBeCalledTimes(1)
  })
})

describe(`test SearchButton Component's handleShowMenu method`, () => {
  it('should call handleShowMenu method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(SearchButton.prototype, 'handleShowMenu').mockImplementation(mockCallback)

    const btn = new SearchButton()
    btn.trigger(acEvents.onShowMenu)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it(`should add newsSearchButtonShowMenu class`, () => {
    const btn = new SearchButton()
    btn.trigger(acEvents.onShowMenu)
    expect(btn.root).toHaveClass(classes.newsSearchButtonShowMenu)
  })
})

describe(`test SearchButton Component's handleHideMenu method`, () => {
  it('should call handleHideMenu method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(SearchButton.prototype, 'handleHideMenu').mockImplementation(mockCallback)

    const btn = new SearchButton()
    btn.trigger(acEvents.onHideMenu)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it(`should remove newsSearchButtonShowMenu class`, () => {
    const btn = new SearchButton()
    btn.trigger(acEvents.onHideMenu)
    expect(btn.root).not.toHaveClass(classes.newsSearchButtonShowMenu)
  })
})
