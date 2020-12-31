/* jshint ignore:start */

const {fireEvent} = require('@testing-library/dom')
require('@testing-library/jest-dom/extend-expect')

const ComponentFunc = require('../../common/component')
const AutoCompleteFunc = require('../autocomplete')
const classes = require('../classes')
const events = require('../events')

beforeAll(() => {
  jest.spyOn(document, 'addEventListener').mockImplementation(() => jest.fn())
})

afterAll(() => {
  jest.restoreAllMocks()
})

let AutoComplete
beforeEach(() => {
  AutoComplete = AutoCompleteFunc(ComponentFunc(), {
    options: [],
  })
})

it('should render correct', () => {
  const ac = new AutoComplete()
  expect(ac.root).toContainHTML(`<div class="${classes.container}">`)
  expect(ac.root).toContainHTML(`<input class="${classes.input}">`)
  expect(ac.root).toContainHTML(`<div class="${classes.menu}">`)
  expect(ac.root).toContainHTML(`<span class="${classes.itemContainer}">`)
  expect(ac.value).toEqual([])
})



it('should listen onChange event', () => {
  const mockCallback = jest.fn()

  AutoComplete = AutoCompleteFunc(ComponentFunc(), {
    onChange: mockCallback,
  })

  const ac = new AutoComplete()

  ac.trigger(events.onChange)

  expect(mockCallback).toBeCalledTimes(1)
})

describe(`test AutoComplete Component's handleDocumentClick method`, () => {

  beforeAll(() => {
    jest.restoreAllMocks()
  })

  afterAll(() => {
    jest.spyOn(document, 'addEventListener').mockImplementation(() => jest.fn())
  })

  beforeEach(() => {
    document.body.innerHTML = ''
  })



  it('should call handleDocumentClick method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(AutoComplete.prototype, 'handleDocumentClick').mockImplementation(mockCallback)

    new AutoComplete()

    fireEvent.click(document)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it('should trigger onHideMenu event', () => {
    const ac = new AutoComplete()
    const mockCallback = jest.fn()
    ac.on(events.onHideMenu, mockCallback)

    const node = document.createElement('div')

    document.body.appendChild(ac.root)
    document.body.appendChild(node)

    fireEvent.click(node)

    expect(mockCallback).toBeCalledTimes(1)
  })

  it('should not trigger onHideMenu event', () => {
    const ac = new AutoComplete()
    const mockCallback = jest.fn()
    ac.on(events.onHideMenu, mockCallback)

    document.body.appendChild(ac.root)

    fireEvent.click(ac.root.firstElementChild)

    expect(mockCallback).not.toBeCalled()
  })
})

describe(`test AutoComplete Component's handleClick method`, () => {
  it('should call handleClick method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(AutoComplete.prototype, 'handleClick').mockImplementation(mockCallback)

    const ac = new AutoComplete()

    fireEvent.click(ac.root)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it('should trigger onFocus event', () => {
    const ac = new AutoComplete()
    const mockCallback = jest.fn()
    ac.on(events.onFocus, mockCallback)

    fireEvent.click(ac.root)

    expect(mockCallback).toBeCalledTimes(1)
  })
})

describe(`test AutoComplete Component's handleInput method`, () => {
  it('should call handleInput method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(AutoComplete.prototype, 'handleInput').mockImplementation(mockCallback)

    const ac = new AutoComplete()

    ac.trigger(events.onInput)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it('should not trigger onRefreshMenu event', function () {
    const ac = new AutoComplete()
    const mockCallback = jest.fn()
    ac.on(events.onRefreshMenu, mockCallback)

    ac.trigger(events.onInput, '')

    expect(mockCallback).not.toBeCalled()
  })

  it('should trigger onRefreshMenu event', function () {
    const ac = new AutoComplete()
    const mockCallback = jest.fn()
    ac.on(events.onRefreshMenu, mockCallback)

    const inputValue = 'whatever'

    ac.trigger(events.onInput, inputValue)

    expect(mockCallback).toBeCalledTimes(1)
    expect(mockCallback.mock.calls[0][0].detail.value).toEqual({
      opts: [],
      selectedOpts: [],
      inputValue: inputValue,
    })
  })
})

describe(`test AutoComplete Component's handleSelected method`, () => {
  it('should call handleSelected method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(AutoComplete.prototype, 'handleSelected').mockImplementation(mockCallback)

    const ac = new AutoComplete()

    // should trigger with text, cause of the autocomplete component contain other components
    ac.trigger(events.onSelected, 'whatever')

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it('should trigger onChange event', () => {
    const ac = new AutoComplete()
    const mockCallback = jest.fn()

    ac.on(events.onChange, mockCallback)

    const selectedValue = 'whatever'
    // should trigger with text, cause of the autocomplete component contain other components
    ac.trigger(events.onSelected, selectedValue)

    expect(mockCallback).toBeCalledTimes(1)
    expect(mockCallback.mock.calls[0][0].detail.value).toEqual([selectedValue])
  })
})

describe(`test AutoComplete Component's handleUnselected method`, () => {
  it('should call handleUnselected method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(AutoComplete.prototype, 'handleUnselected').mockImplementation(mockCallback)

    const ac = new AutoComplete()

    // should trigger with text, cause of the autocomplete component contain other components
    ac.trigger(events.onUnselected, 'whatever')

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it('should trigger onChange event with empty array', () => {
    const ac = new AutoComplete()
    const mockCallback = jest.fn()
    ac.on(events.onChange, mockCallback)

    const selectedValue = 'whatever'
    ac.value = [selectedValue]
    // should trigger with text, cause of the autocomplete component contain other components
    ac.trigger(events.onUnselected, selectedValue)

    expect(mockCallback).toBeCalledTimes(1)
    expect(mockCallback.mock.calls[0][0].detail.value).toEqual([])
  })
})

describe('test AutoComplete Component when single = true', () => {
  beforeEach(() => {
    AutoComplete = AutoCompleteFunc(ComponentFunc(), {
      options: [],
      single: true,
    })
  })

  it('should render correct with single = true', () => {
    const ac = new AutoComplete()

    expect(ac.root).toContainHTML(`<div class="${classes.container}">`)
    expect(ac.root).toContainHTML(`<input class="${classes.input}">`)
    expect(ac.root).toContainHTML(`<div class="${classes.menu}">`)
    expect(ac.root).not.toContainHTML(`<span class="${classes.itemContainer}">`)
    expect(ac.value).toBe('')
  })

  it('should trigger onChange event when single = true', () => {
    const ac = new AutoComplete()
    const mockCallback = jest.fn()
    ac.on(events.onChange, mockCallback)

    const selectedValue = 'whatever'
    // should trigger with text, cause of the autocomplete component contain other components
    ac.trigger(events.onSelected, selectedValue)

    expect(mockCallback).toBeCalledTimes(1)
    expect(mockCallback.mock.calls[0][0].detail.value).toEqual(selectedValue)
  })

  it('should trigger onRefreshMenu event when single = true', function () {
    const ac = new AutoComplete()
    const mockCallback = jest.fn()
    ac.on(events.onRefreshMenu, mockCallback)

    const inputValue = 'whatever'

    ac.trigger(events.onInput, inputValue)

    expect(mockCallback).toBeCalledTimes(1)
    expect(mockCallback.mock.calls[0][0].detail.value).toEqual({
      opts: [],
      inputValue: inputValue,
    })
  })

})


