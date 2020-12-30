/* jshint ignore:start */
require('@testing-library/jest-dom/extend-expect')

require('../index')

it('should load images', function () {
  const srcValue = 'whatever'
  const node = document.createElement('img')
  node.dataset.src = srcValue

  Lazy(node)

  expect(node).toHaveAttribute('data-loaded', 'true')
  expect(node).toHaveAttribute('src', node.dataset.src)
})
