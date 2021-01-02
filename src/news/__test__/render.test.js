/* jshint ignore:start */
require('@testing-library/jest-dom/extend-expect')

const render = require('../render')

it('should render correct', function () {
  const template = `
  <div>{{a}}</div>
  <div>{{b}}</div>
  <div>{{c}}</div>
  `

  const data = {
    a: 'a',
    b: 'b',
    c: 'c',
    d: 'd',
  }

  const res = render(template, data)

  expect(res).toEqual(`
  <div>a</div>
  <div>b</div>
  <div>c</div>
  `)

})

