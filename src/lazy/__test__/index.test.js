/* jshint ignore:start */
require('@testing-library/jest-dom/extend-expect')

require('../index')

it('should load images', () => {
  const srcValue = 'whatever'
  const node = document.createElement('img')
  node.dataset.src = srcValue

  Lazy(node)

  expect(node).toHaveAttribute('data-loaded', 'true')
  expect(node).toHaveAttribute('src', node.dataset.src)
})

it('should call option onLoaded method', () => {
  const node = document.createElement('img')
  const mockCallback = jest.fn()

  Lazy(node, {
    onLoaded: mockCallback,
  })

  expect(mockCallback).toBeCalledTimes(1)
  expect(mockCallback).toBeCalledWith(node)
})
