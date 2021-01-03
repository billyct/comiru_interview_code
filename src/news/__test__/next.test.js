/* jshint ignore:start */
require('@testing-library/jest-dom/extend-expect')
const {fireEvent} = require('@testing-library/dom')

const ComponentFunc = require('../../common/component')
const NextFunc = require('../next')
const events = require('../events')

let Next

beforeEach(() => {
  Next = NextFunc(ComponentFunc())
  initMockHTML()
})

afterEach(() => {
  document.body.innerHTML = ''
})

function initMockHTML() {
  document.body.innerHTML = `
  <button id="next-btn"/>
  `
}

describe(`test Next Component's constructor`, () => {
  it('should be correct', () => {
    const next = new Next()
    expect(next.root).toBeInstanceOf(Element)
  })
})

describe(`test Next Component's handleClick method`, () => {
  it('should call handleClick method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(Next.prototype, 'handleClick').mockImplementation(mockCallback)

    const next = new Next()

    fireEvent.click(next.root)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it('should trigger onNext event', () => {
    const next = new Next()

    const mockCallback = jest.fn()
    next.on(events.onNext, mockCallback)

    fireEvent.click(next.root)

    expect(mockCallback).toBeCalledTimes(1)
  })
})

describe(`test Next Component's handleShowNext method`, () => {
  it('should call handleShowNext method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(Next.prototype, 'handleShowNext').mockImplementation(mockCallback)

    const next = new Next()
    next.trigger(events.onShowNext)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it(`should set root's display style to flex`, () => {
    const next = new Next()
    next.trigger(events.onShowNext)
    expect(next.root).toHaveStyle('display:flex;')
  })
})

describe(`test Next Component's handleHideNext method`, () => {
  it('should call handleHideNext method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(Next.prototype, 'handleHideNext').mockImplementation(mockCallback)

    const next = new Next()
    next.trigger(events.onHideNext)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it(`should set root's display style to none`, () => {
    const next = new Next()
    next.trigger(events.onHideNext)
    expect(next.root).toHaveStyle('display:none;')
  })
})
