/* jshint ignore:start */
const {getByText, fireEvent} = require('@testing-library/dom')
require('@testing-library/jest-dom/extend-expect')

const ComponentFunc = require('../../common/component')
const ItemFunc = require('../item')
const events = require('../events')
const classes = require('../classes')

let Item

beforeEach(() => {
  Item = ItemFunc(ComponentFunc())
})

it(`should render the Item component's html`, () => {
  let item = new Item()
  expect(item.root).toContainHTML(`<span class="${classes.itemContainer}"></span>`)
})

describe(`test Item Component's handleSelected method`, () => {
  it('should call handleSelected method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(Item.prototype, 'handleSelected').mockImplementation(mockCallback)

    const item = new Item()

    item.trigger(events.onSelected)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it(`should render the Item's html`, () => {
    const item = new Item()

    const selectedValue = 'whatever'

    item.trigger(events.onSelected, selectedValue)

    expect(item.root).toContainHTML(`<span class="${classes.item}">`)
    expect(item.root).toContainHTML(`<span class="${classes.itemContent}">${selectedValue}</span>`)
    expect(item.root).toContainHTML(`<span class="${classes.itemRemove}">`)
  })
})

describe(`test Item Component's handleClick method`, () => {
  it('should call handleClick method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(Item.prototype, 'handleClick').mockImplementation(mockCallback)

    const item = new Item()

    fireEvent.click(item.root)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it('should not call target.parentNode.remove()', () => {
    const item = new Item()
    item.trigger(events.onSelected, 'whatever')

    const first = item.root.firstElementChild

    fireEvent.click(first.firstElementChild)
    expect(item.root).toContainElement(first)
  })

  it('should call target.parentNode.remove()', () => {
    const item = new Item()
    item.trigger(events.onSelected, 'whatever')

    const first = item.root.firstElementChild

    fireEvent.click(first.lastElementChild)
    expect(item.root).not.toContainElement(first)
  })

  it('should trigger onUnselected event', () => {
    const mockCallback = jest.fn()
    const item = new Item()

    item.on(events.onUnselected, mockCallback)

    const selectedValue = 'whatever'

    item.trigger(events.onSelected, selectedValue)

    fireEvent.click(item.root.firstElementChild.lastElementChild)

    expect(mockCallback).toBeCalledTimes(1)
    expect(mockCallback.mock.calls[0][0].detail.value).toBe(selectedValue)
  })
})

describe(`test Item Component's handleUnselected method`, () => {
  it('should call the handleUnselected method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(Item.prototype, 'handleUnselected').mockImplementation(mockCallback)

    const item = new Item()
    item.trigger(events.onUnselected)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it('should call node.parentNode.remove()', async () => {

    const item = new Item()

    const selectedValue = 'whatever'
    item.trigger(events.onSelected, selectedValue)

    const node = await getByText(item.root, selectedValue)

    item.trigger(events.onUnselected, selectedValue)
    expect(item.root).not.toContainElement(node)
  })

  it('should not call node.parentNode.remove()', async () => {
    const item = new Item()

    const selectedValue = 'whatever'
    item.trigger(events.onSelected, selectedValue)

    const node = await getByText(item.root, selectedValue)

    item.trigger(events.onUnselected, selectedValue + 'x')
    expect(item.root).toContainElement(node)
  })
})

describe(`test Item Component's handlePressBackspace method`, () => {
  it('should trigger onUnselected event', () => {
    const mockCallback = jest.fn()
    const item = new Item()
    const selectedValue = 'whatever'

    item.on(events.onUnselected, mockCallback)

    item.trigger(events.onSelected, selectedValue)

    item.trigger(events.onPressBackspace)

    expect(mockCallback).toBeCalledTimes(1)
    expect(mockCallback.mock.calls[0][0].detail.value).toBe(selectedValue)
  })
})

/* jshint ignore:end */
