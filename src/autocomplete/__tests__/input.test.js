/* jshint ignore:start */
const {fireEvent} = require('@testing-library/dom')
require('@testing-library/jest-dom/extend-expect')

const ComponentFunc = require('../../common/component')
const InputFunc = require('../input')
const events = require('../events')
const classes = require('../classes')

let Input

beforeEach(() => {
  Input = InputFunc(ComponentFunc())
})

it(`should render with the Input component's right html`, () => {
  const input = new Input()
  expect(input.root).toContainHTML(`<span class="${classes.inputContainer}">`)
  expect(input.root).toContainHTML(`<input class="${classes.input}">`)
  expect(input.root).toContainHTML(`<span class="${classes.inputMirror}">`)
})

describe(`test Input Component's handleFocus method`, () => {
  it('should call handleFocus method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(Input.prototype, 'handleFocus').mockImplementation(mockCallback)
    const input = new Input()

    input.trigger(events.onFocus)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it('should focus the input node', () => {
    const input = new Input()
    document.body.appendChild(input.root)

    input.trigger(events.onFocus)

    expect(input.node).toHaveFocus()

    document.body.innerHTML = ''
  })

  it('should trigger onInput event', () => {
    const mockCallback = jest.fn()

    const inputValue = randomElement([
      'filled', '',
    ])
    const input = new Input()
    input.on(events.onInput, mockCallback)
    input.node.value = inputValue

    input.trigger(events.onFocus)

    expect(mockCallback).toBeCalledTimes(1)
    expect(mockCallback.mock.calls[0][0].detail.value).toBe(inputValue)
  })
})

describe(`test Input Component's handleInput method`, () => {

  it('should call handleInput method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(Input.prototype, 'handleInput').mockImplementation(mockCallback)
    const input = new Input()

    fireEvent.input(input.node)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it(`should update the mirror's textContent and refresh the root's width`, () => {
    const input = new Input()

    const inputValue = 'test'

    fireEvent.input(input.node, {target: {value: inputValue}})

    expect(input.mirror).toHaveTextContent(inputValue)
    expect(input.root).toHaveStyle(`width:${input.mirror.scrollWidth}px`)
  })

  it('should trigger onInput event with target value', () => {
    const mockCallback = jest.fn()

    const input = new Input()
    input.on(events.onInput, mockCallback)

    const inputValue = 'test'

    fireEvent.input(input.node, {target: {value: inputValue}})

    expect(mockCallback).toBeCalledTimes(1)
    expect(mockCallback.mock.calls[0][0].detail.value).toBe(inputValue)
  })
})

describe('test Input handleKeyDown method', () => {
  it('should call handleKeyDown method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(Input.prototype, 'handleKeyDown').mockImplementation(mockCallback)
    const input = new Input()

    fireEvent.keyDown(input.node)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it('should trigger the onPressBackspace events', () => {
    const mockCallback = jest.fn()
    const input = new Input()
    input.on(events.onPressBackspace, mockCallback)

    fireEvent.keyDown(input.node, {key: 'Backspace'})

    expect(mockCallback).toBeCalledTimes(1)
  })

  it('should not trigger the onPressBackspace events', () => {
    const mockCallback = jest.fn()
    const input = new Input()
    input.node.value = 'whatever'
    input.on(events.onPressBackspace, mockCallback)

    fireEvent.keyDown(input.node, {key: 'Backspace'})

    expect(mockCallback).not.toBeCalled()
  })

  it('should trigger the onHideMenu events', () => {
    const mockCallback = jest.fn()
    const input = new Input()
    input.on(events.onHideMenu, mockCallback)

    fireEvent.keyDown(input.node, {key: 'Escape'})

    expect(mockCallback).toBeCalledTimes(1)
  })

  it('should trigger the onHoverPrev events', () => {
    const mockCallback = jest.fn()
    const input = new Input()
    input.on(events.onHoverPrev, mockCallback)

    fireEvent.keyDown(input.node, {key: 'ArrowUp'})

    expect(mockCallback).toBeCalledTimes(1)
  })

  it('should trigger the onHoverNext events', () => {
    const mockCallback = jest.fn()
    const input = new Input()
    input.on(events.onHoverNext, mockCallback)

    fireEvent.keyDown(input.node, {key: 'ArrowDown'})

    expect(mockCallback).toBeCalledTimes(1)
  })

  it('should trigger the onPressEnter events', () => {
    const mockCallback = jest.fn()
    const input = new Input()
    input.on(events.onPressEnter, mockCallback)

    fireEvent.keyDown(input.node, {key: 'Enter'})

    expect(mockCallback).toBeCalledTimes(1)
  })
})

describe('test Input handleSelected method', () => {
  it('should call handleSelected method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(Input.prototype, 'handleSelected').mockImplementation(mockCallback)
    const input = new Input()

    input.trigger(events.onSelected)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it('should input the value and call handleInput when single = true', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(Input.prototype, 'handleInput').mockImplementation(mockCallback)
    const input = new Input()
    input.opts.single = true

    const inputValue = 'whatever'

    input.trigger(events.onSelected, inputValue)

    expect(input.node).toHaveValue(inputValue)
    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it('should not input the value and not call handleInput', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(Input.prototype, 'handleInput').mockImplementation(mockCallback)
    const input = new Input()

    const inputValue = 'whatever'

    input.trigger(events.onSelected, inputValue)

    expect(input.node).not.toHaveValue(inputValue)
    expect(mockCallback).not.toBeCalled()

    spy.mockRestore()
  })
})

describe('test Input handleInputClear method', () => {
  it('should call handleInputClear method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(Input.prototype, 'handleInputClear').mockImplementation(mockCallback)
    const input = new Input()

    input.trigger(events.onInputClear)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it('should clear input value', () => {
    const input = new Input()
    input.node.value = 'whatever'

    input.trigger(events.onInputClear)

    expect(input.node.value).toBe('')
  })

  it('should call handleInput method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(Input.prototype, 'handleInput').mockImplementation(mockCallback)

    const input = new Input()

    input.trigger(events.onInputClear)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it('should focus the input node', () => {
    const input = new Input()
    document.body.appendChild(input.root)

    input.trigger(events.onInputClear)

    expect(input.node).toHaveFocus()

    document.body.innerHTML = ''
  })
})

/* jshint ignore:end */
