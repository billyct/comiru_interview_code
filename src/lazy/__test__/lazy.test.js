/* jshint ignore:start */
require('@testing-library/jest-dom/extend-expect')

const LazyFunc = require('../lazy')
const Lazy = LazyFunc()

describe(`test Lazy Component's isLoaded method`, () => {
  it('should return true', () => {
    const lazy = new Lazy('test')
    const node = document.createElement('img')
    node.dataset.loaded = true

    expect(lazy.isLoaded(node)).toBeTruthy()
  })

  it('should return false', () => {
    const lazy = new Lazy('test')
    const node = document.createElement('img')

    expect(lazy.isLoaded(node)).toBeFalsy()
  })
})

describe(`test Lazy Component's load method`, () => {
  it('should add src attribute', function () {
    const lazy = new Lazy('test')
    const srcValue = 'whatever'

    const node = document.createElement('img')
    node.dataset.src = srcValue

    lazy.load(node)

    expect(node).toHaveAttribute('src', srcValue)
  })

  it('should not add src attribute', function () {
    const lazy = new Lazy('test')
    const node = document.createElement('img')

    lazy.load(node)

    expect(node).not.toHaveAttribute('src')
  })
})

describe(`test Lazy Component's markAsLoaded method`, () => {
  it('should add data-loaded attribute', function () {
    const lazy = new Lazy('test')

    const node = document.createElement('img')
    lazy.markAsLoaded(node)

    expect(node).toHaveAttribute('data-loaded', 'true')
  })
})

describe(`test Lazy Component's support method`, () => {
  it('should be correct', function () {
    const lazy = new Lazy('test')
    const type = 'whatever'

    expect(lazy.support(type)).toBeFalsy()
    window[type] = true
    expect(lazy.support(type)).toBeTruthy()
  })
})

