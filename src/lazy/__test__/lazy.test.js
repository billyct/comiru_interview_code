/* jshint ignore:start */
require('@testing-library/jest-dom/extend-expect')

const LazyFunc = require('../lazy')

let Lazy

beforeAll(() => {
  Lazy = LazyFunc('test')
})

describe(`test Lazy Component's isLoaded method`, () => {
  it('should return true', () => {
    const lazy = new Lazy()
    const node = document.createElement('img')
    node.dataset.loaded = true

    expect(lazy.isLoaded(node)).toBeTruthy()
  })

  it('should return false', () => {
    const lazy = new Lazy()
    const node = document.createElement('img')

    expect(lazy.isLoaded(node)).toBeFalsy()
  })
})

describe(`test Lazy Component's load method`, () => {
  it('should add src attribute', () => {
    const lazy = new Lazy()
    const srcValue = 'whatever'

    const node = document.createElement('img')
    node.dataset.src = srcValue

    lazy.load(node)

    expect(node).toHaveAttribute('src', srcValue)
  })

  it('should not add src attribute', () => {
    const lazy = new Lazy()
    const node = document.createElement('img')

    lazy.load(node)

    expect(node).not.toHaveAttribute('src')
  })
})

describe(`test Lazy Component's markAsLoaded method`, () => {
  it('should add data-loaded attribute', () => {
    const lazy = new Lazy()

    const node = document.createElement('img')
    lazy.markAsLoaded(node)

    expect(node).toHaveAttribute('data-loaded', 'true')
  })
})

describe(`test Lazy Component's support method`, () => {
  it('should be correct', () => {
    const lazy = new Lazy()
    const type = 'whatever'

    expect(lazy.support(type)).toBeFalsy()
    window[type] = true
    expect(lazy.support(type)).toBeTruthy()
  })
})

describe(`test Lazy Component's loaded method`, () => {
  it('should call onLoaded option method', () => {
    const lazy = new Lazy()
    const node = document.createElement('img')
    const mockCallback = jest.fn()
    lazy.opts = {
      onLoaded: mockCallback,
    }

    lazy.loaded(node)

    expect(mockCallback).toBeCalledTimes(1)
    expect(mockCallback).toBeCalledWith(node)
  })
})

