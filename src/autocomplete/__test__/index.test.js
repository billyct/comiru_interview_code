/* jshint ignore:start */

require('@testing-library/jest-dom/extend-expect')

require('../index')

const classes = require('../classes')
const events = require('../events')

it('should render correct with string type el', function () {
  const id = 'whatever'
  const node = document.createElement('div')
  node.id = id

  document.body.appendChild(node)

  AutoComplete(`#${id}`, {})

  expect(node).toContainHTML(`<div class="${classes.container}">`)
  expect(node).toContainHTML(`<input class="${classes.input}">`)
  expect(node).toContainHTML(`<div class="${classes.menu}">`)
  expect(node).toContainHTML(`<span class="${classes.itemContainer}">`)

  document.body.innerHTML = ''
})

it('should render correct with Element type el', function () {
  const node = document.createElement('div')

  AutoComplete(node, {})

  expect(node).toContainHTML(`<div class="${classes.container}">`)
  expect(node).toContainHTML(`<input class="${classes.input}">`)
  expect(node).toContainHTML(`<div class="${classes.menu}">`)
  expect(node).toContainHTML(`<span class="${classes.itemContainer}">`)
})

it('should be independent with difference instances', function () {
  const node = document.createElement('div')

  const ac1 = AutoComplete(node, {})
  const ac2 = AutoComplete(node, {})

  const mockCallback = jest.fn()

  ac1.on(events.onFocus, mockCallback)

  // different instances yet
  ac2.trigger(events.onFocus)
  expect(mockCallback).not.toBeCalled()

  ac1.trigger(events.onFocus)
  expect(mockCallback).toBeCalledTimes(1)
})
