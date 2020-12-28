/* jshint ignore:start */
const {querySelector, createElement} =  require('../html')

describe('test createElement function', () => {
  it('should create a div element with classname c1', () => {
    const node = createElement('div', 'c1')
    expect(node.tagName).toBe('DIV')
    expect(node.className).toBe('c1')
  })

  it('should create a span element with classname c2', () => {
    const node = createElement('span', 'c2')
    expect(node.tagName).toBe('SPAN')
    expect(node.className).toBe('c2')
  })
})

describe('test querySelector function', () => {
  const node = document.createElement('div')
  node.innerHTML = `
    <ul class="ul">
      <li class="li">a</li>
      <li class="li">b</li>
      <li class="li">c</li>
      <li class="li">d</li>
      <li class="li">e</li>
      <li class="li">f</li>
      <li id="strong" class="li">text with st<strong>r</string>ong</li>
    </ul>
  `

  document.body.appendChild(node)

  it('should query a element with classname', () => {
    const li = querySelector(node, {
      className: 'li'
    })

    expect(li.textContent).toBe('a')
  })

  it('should query a element with classname and textContent', () => {
    const li = querySelector(node, {
      className: 'li',
      textContent: 'd'
    })

    expect(li.textContent).toBe('d')
  })

  it('should query a element with classname and index', () => {
    const li = querySelector(node, {
      className: 'li',
      index: 2
    })

    expect(li.textContent).toBe('b')
  })

  it('should query a element with the text with strong', () => {
    const li = querySelector(node, {
      className: 'li',
      textContent: 'text with strong'
    })

    const want = document.querySelector('#strong')

    expect(li).toBe(want)
  })

  it('should query a element then return null', () => {
    const li = querySelector(node, {
      className: 'li',
      textContent: 'a',
      index: 2
    })

    expect(li).toBeNull()
  })
})


/* jshint ignore:end */
