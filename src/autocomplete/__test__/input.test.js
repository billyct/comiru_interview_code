/* jshint ignore:start */

const {screen, fireEvent} = require('@testing-library/dom')
require('@testing-library/jest-dom/extend-expect')

const Input = require('../input')
const events = require('../events')

beforeEach(() => {
  document.body.innerHTML = ''
})

it('should render with the right html', () => {
  const input = new Input()
  document.body.appendChild(input.root)
  expect(document.body.innerHTML).toBe(`<span class="ac__input__container"><input class="ac__input"></span>`)
})

describe('test Input handleFocus method', () => {
  it('should call handleFocus when onFocus event triggered', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(Input.prototype, 'handleFocus').mockImplementation(mockCallback)
    const input = new Input()

    input.trigger(events.onFocus)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it('should focused when onFocus event triggered', () => {
    const input = new Input()
    document.body.appendChild(input.root)

    input.trigger(events.onFocus)

    expect(screen.getByRole('textbox')).toHaveFocus()
  })

  it('should trigger onShowMenu event when onFocus event triggered with the input value filled', () => {
    const mockCallback = jest.fn()

    const input = new Input()
    input.on(events.onShowMenu, mockCallback)
    input.node.value = 'test'

    input.trigger(events.onFocus)

    expect(mockCallback).toBeCalledTimes(1)
  })
})

describe('test Input handleInput method', () => {

  it('should call handleInput method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(Input.prototype, 'handleInput').mockImplementation(mockCallback)
    const input = new Input()

    fireEvent.input(input.node)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it('should call _refreshWidth method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(Input.prototype, '_refreshWidth').mockImplementation(mockCallback)
    const input = new Input()

    fireEvent.input(input.node)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it('should trigger onInput event with target value', () => {
    const mockCallback = jest.fn()

    const input = new Input()
    input.on(events.onInput, mockCallback)

    const inputValue = 'test'

    fireEvent.input(input.node, {target: {value: inputValue}})

    expect(mockCallback).toBeCalledTimes(1)
    expect(mockCallback).toBeCalledWith(new CustomEvent({
      detail: {
        value: inputValue,
      }
    }))
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

    expect(mockCallback).toBeCalledTimes(0)
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

/* jshint ignore:end */
