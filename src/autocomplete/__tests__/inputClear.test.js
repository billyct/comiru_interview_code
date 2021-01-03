/* jshint ignore:start */
const {fireEvent} = require('@testing-library/dom')
require('@testing-library/jest-dom/extend-expect')

const ComponentFunc = require('../../common/component')
const InputClearFunc = require('../inputClear')
const events = require('../events')
const classes = require('../classes')

let InputClear

beforeEach(() => {
  InputClear = InputClearFunc(ComponentFunc())
})

describe(`test InputClear Component's constructor`, () => {
  it(`should render correct`, () => {
    const input = new InputClear()
    expect(input.root).toContainHTML(`<button class="${classes.inputClear}">`)
  })
})

describe(`test InputClear Component's handleClick method`, () => {
  it(`should call handleClick method`, () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(InputClear.prototype, 'handleClick').mockImplementation(mockCallback)

    const input = new InputClear()

    fireEvent.click(input.root)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it(`should trigger onInputClear event`, () => {
    const input = new InputClear()

    const mockCallback = jest.fn()
    input.on(events.onInputClear, mockCallback)

    fireEvent.click(input.root)

    expect(mockCallback).toBeCalledTimes(1)
  })

})


