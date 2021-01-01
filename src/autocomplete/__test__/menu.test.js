/* jshint ignore:start */
const {fireEvent} = require('@testing-library/dom')
require('@testing-library/jest-dom/extend-expect')

const ComponentFunc = require('../../common/component')
const MenuFunc = require('../menu')
const events = require('../events')
const classes = require('../classes')

let Menu

beforeEach(() => {
  Menu = MenuFunc(ComponentFunc())
})

it(`should render the Item component's html`, () => {
  const menu = new Menu()
  expect(menu.root).toContainHTML(`<div class="${classes.menu}"></div>`)
})

describe(`test Menu Component's handlePressEnter method`, () => {
  it('should call handlePressEnter method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(Menu.prototype, 'handlePressEnter').mockImplementation(mockCallback)

    const menu = new Menu()

    menu.trigger(events.onPressEnter)

    expect(mockCallback).toBeCalledTimes(1)
    spy.mockRestore()
  })

  describe(`test it will trigger root's click event or not`, () => {

    let mockCallback, spy, menu

    beforeEach(() => {
      mockCallback = jest.fn()
      spy = jest.spyOn(Menu.prototype, 'handleClick').mockImplementation(mockCallback)

      menu = new Menu()
      menu.trigger(events.onRefreshMenu, {
        opts: [
          'a', 'b', 'c', 'd', 'e',
        ]
      })
    })

    afterEach(() => {
      spy.mockRestore()
    })

    it(`should trigger root's click event`, function () {
      menu.root.firstElementChild.classList.add(classes.menuItemHover)

      menu.trigger(events.onPressEnter)
      expect(mockCallback).toBeCalledTimes(1)
    })

    it(`should not trigger root's click event`, function () {
      menu.trigger(events.onPressEnter)
      expect(mockCallback).not.toBeCalled()
    })
  })


})

describe(`test Menu Component's handleHoverPrev method`, () => {
  it('should call handleHoverPrev method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(Menu.prototype, 'handleHoverPrev').mockImplementation(mockCallback)

    const menu = new Menu()

    menu.trigger(events.onHoverPrev)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it('should do nothing', () => {
    const menu = new Menu()
    menu.trigger(events.onRefreshMenu, {
      opts: [
        'a', 'b', 'c',
      ]
    })

    menu.trigger(events.onHoverPrev)

    menu.root.childNodes.forEach(node => {
      expect(node).not.toHaveClass(classes.menuItemHover)
    })
  })

  it('should do nothing when first child has menuItemHover class', () => {
    const menu = new Menu()
    menu.trigger(events.onRefreshMenu, {
      opts: [
        'a', 'b',
      ]
    })

    menu.root.firstElementChild.classList.add(classes.menuItemHover)

    menu.trigger(events.onHoverPrev)

    expect(menu.root.firstElementChild).toHaveClass(classes.menuItemHover)
    expect(menu.root.lastElementChild).not.toHaveClass(classes.menuItemHover)
  })

  it(`should remove current node's menuItemHover and add the class to the prev node`, () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(Menu.prototype, '_ensureVisible').mockImplementation(mockCallback)

    const menu = new Menu()
    menu.trigger(events.onRefreshMenu, {
      opts: [
        'a', 'b',
      ]
    })

    menu.root.lastElementChild.classList.add(classes.menuItemHover)

    menu.trigger(events.onHoverPrev)

    expect(menu.root.lastElementChild).not.toHaveClass(classes.menuItemHover)
    expect(menu.root.firstElementChild).toHaveClass(classes.menuItemHover)

    expect(mockCallback).toBeCalledTimes(1)
    expect(mockCallback).toBeCalledWith(menu.root.firstElementChild)

    spy.mockRestore()
  })
})


describe(`test Menu Component's handleHoverNext method`, () => {
  it('should call handleHoverNext method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(Menu.prototype, 'handleHoverNext').mockImplementation(mockCallback)

    const menu = new Menu()

    menu.trigger(events.onHoverNext)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it('should add the menuItemHover class to the first child', () => {
    const menu = new Menu()
    menu.trigger(events.onRefreshMenu, {
      opts: [
        'a', 'b'
      ]
    })

    menu.trigger(events.onHoverNext)

    expect(menu.root.firstElementChild).toHaveClass(classes.menuItemHover)
    expect(menu.root.lastElementChild).not.toHaveClass(classes.menuItemHover)
  })

  it('should do nothing when last child has menuItemHover class', () => {
    const menu = new Menu()
    menu.trigger(events.onRefreshMenu, {
      opts: [
        'a', 'b',
      ]
    })

    menu.root.lastElementChild.classList.add(classes.menuItemHover)

    menu.trigger(events.onHoverNext)

    expect(menu.root.firstElementChild).not.toHaveClass(classes.menuItemHover)
    expect(menu.root.lastElementChild).toHaveClass(classes.menuItemHover)

  })

  it(`should remove current node's menuItemHover class and add the class to the next node`, () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(Menu.prototype, '_ensureVisible').mockImplementation(mockCallback)

    const menu = new Menu()
    menu.trigger(events.onRefreshMenu, {
      opts: [
        'a', 'b',
      ]
    })

    menu.root.firstElementChild.classList.add(classes.menuItemHover)

    menu.trigger(events.onHoverNext)

    expect(menu.root.firstElementChild).not.toHaveClass(classes.menuItemHover)
    expect(menu.root.lastElementChild).toHaveClass(classes.menuItemHover)

    expect(mockCallback).toBeCalledTimes(1)
    expect(mockCallback).toBeCalledWith(menu.root.lastElementChild)

    spy.mockRestore()
  })
})

describe(`test Menu Component's handleUnselected method`, () => {
  it('should call handleUnselected method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(Menu.prototype, 'handleUnselected').mockImplementation(mockCallback)

    const menu = new Menu()

    menu.trigger(events.onUnselected)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it('should do nothing when the menuItemSelected class and textContent not match', () => {
    const menu = new Menu()
    menu.trigger(events.onRefreshMenu, {
      opts: [
        'a', 'b',
      ]
    })

    menu.root.firstElementChild.classList.add(classes.menuItemSelected)
    menu.trigger(events.onUnselected, 'b')

    expect(menu.root.firstElementChild).toHaveClass(classes.menuItemSelected)
    expect(menu.root.lastElementChild).not.toHaveClass(classes.menuItemSelected)
  })

  it('should remove the menuItemSelected class', function () {
    const menu = new Menu()
    menu.trigger(events.onRefreshMenu, {
      opts: [
        'a', 'b',
      ]
    })

    menu.root.firstElementChild.classList.add(classes.menuItemSelected)
    menu.trigger(events.onUnselected, 'a')

    expect(menu.root.firstElementChild).not.toHaveClass(classes.menuItemSelected)
    expect(menu.root.lastElementChild).not.toHaveClass(classes.menuItemSelected)
  })
})

describe(`test Menu Component's handleSelected method`, () => {
  it('should call handleSelected method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(Menu.prototype, 'handleSelected').mockImplementation(mockCallback)

    const menu = new Menu()

    menu.trigger(events.onSelected)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it('should add the menuItemSelected class to the item', () => {
    const menu = new Menu()
    menu.trigger(events.onRefreshMenu, {
      opts: [
        'a', 'b',
      ]
    })

    menu.trigger(events.onSelected, 'a')
    menu.trigger(events.onSelected, 'b')

    expect(menu.root.firstElementChild).toHaveClass(classes.menuItemSelected)
    expect(menu.root.lastElementChild).toHaveClass(classes.menuItemSelected)
  })

  it('should trigger onHideMenu event when single = true', () => {
    const menu = new Menu()
    menu.opts.single = true

    const mockCallback = jest.fn()
    menu.on(events.onHideMenu, mockCallback)

    menu.trigger(events.onRefreshMenu, {
      opts: [
        'a', 'b',
      ]
    })

    menu.trigger(events.onSelected, 'a')

    expect(mockCallback).toBeCalledTimes(1)
    expect(menu.root.firstElementChild).not.toHaveClass(classes.menuItemSelected)
  })
})

describe(`test Menu Component's handleClick method`, () => {
  it('should call handleClick method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(Menu.prototype, 'handleClick').mockImplementation(mockCallback)

    const menu = new Menu()

    fireEvent.click(menu.root)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it('should trigger onUnselected event', () => {
    const menu = new Menu()
    menu.trigger(events.onRefreshMenu, {
      opts: [
        'a', 'b', 'c',
      ]
    })

    const mockCallback = jest.fn()
    menu.on(events.onUnselected, mockCallback)

    menu.root.firstElementChild.classList.add(classes.menuItemSelected)

    fireEvent.click(menu.root.firstElementChild)

    expect(mockCallback).toBeCalledTimes(1)
    expect(mockCallback.mock.calls[0][0].detail.value).toBe('a')
  })


  it('should trigger onSelected event', () => {

    const menu = new Menu()
    menu.trigger(events.onRefreshMenu, {
      opts: [
        'a', 'b', 'c',
      ]
    })

    const mockCallback = jest.fn()
    menu.on(events.onSelected, mockCallback)

    fireEvent.click(menu.root.firstElementChild)

    expect(mockCallback).toBeCalledTimes(1)
    expect(mockCallback.mock.calls[0][0].detail.value).toBe('a')
  })

  it('should not trigger onSelected or onUnselected event', () => {
    const menu = new Menu()
    menu.trigger(events.onRefreshMenu, {
      opts: [
        'a', 'b', 'c',
      ]
    })

    const node = document.createElement('div')
    menu.root.appendChild(node)

    const mockCallback = jest.fn()
    menu.on(events.onSelected, mockCallback)
    menu.on(events.onUnselected, mockCallback)

    fireEvent.click(node)

    expect(mockCallback).not.toBeCalled()
  })
})

describe(`test Menu Component's handleRefreshMenu method`, () => {
  it('should call handleRefreshMenu method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(Menu.prototype, 'handleRefreshMenu').mockImplementation(mockCallback)

    const menu = new Menu()
    menu.trigger(events.onRefreshMenu)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it('should render with opts', () => {
    const menu = new Menu()
    menu.trigger(events.onRefreshMenu, {
      opts: [
        'a', 'b', 'c',
      ]
    })

    expect(menu.root).toContainHTML(`<div class="${classes.menuItem}">a</div>`)
    expect(menu.root).toContainHTML(`<div class="${classes.menuItem}">b</div>`)
    expect(menu.root).toContainHTML(`<div class="${classes.menuItem}">c</div>`)
  })

  it('should render with opts and selectedValue', () => {
    const menu = new Menu()
    menu.trigger(events.onRefreshMenu, {
      opts: [
        'a', 'b', 'c',
      ],
      selectedOpts: [
        'a',
      ]
    })

    expect(menu.root).toContainHTML(`<div class="${classes.menuItem} ${classes.menuItemSelected}">a</div>`)
    expect(menu.root).toContainHTML(`<div class="${classes.menuItem}">b</div>`)
    expect(menu.root).toContainHTML(`<div class="${classes.menuItem}">c</div>`)
  })

  it('should render with opts, selectedValue and inputValue', () => {
    const menu = new Menu()
    menu.trigger(events.onRefreshMenu, {
      opts: [
        'ab', 'bc', 'cb',
      ],
      selectedOpts: [
        'ab',
      ],
      inputValue: 'b'
    })

    expect(menu.root).toContainHTML(`<div class="${classes.menuItem} ${classes.menuItemSelected}">a<strong>b</strong></div>`)
    expect(menu.root).toContainHTML(`<div class="${classes.menuItem}"><strong>b</strong>c</div>`)
    expect(menu.root).toContainHTML(`<div class="${classes.menuItem}">c<strong>b</strong></div>`)
  })

  it('should trigger onShowMenu event', function () {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(Menu.prototype, 'handleShow').mockImplementation(mockCallback)

    const menu = new Menu()
    menu.trigger(events.onRefreshMenu, {
      opts: [],
    })

    expect(mockCallback).toBeCalledTimes(1)
    spy.mockRestore()
  })
})

describe(`test Menu Component's handleShow method`, () => {
  it('should call handleShow method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(Menu.prototype, 'handleShow').mockImplementation(mockCallback)

    const menu = new Menu()

    menu.trigger(events.onShowMenu)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it(`should set style.display = 'block'`, () => {
    const menu = new Menu()
    menu.root.innerHTML = 'whatever'
    menu.trigger(events.onShowMenu)
    expect(menu.root).toHaveStyle(`display:block;`)
  })

  it(`should trigger onHideMenu event`, () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(Menu.prototype, 'handleHide').mockImplementation(mockCallback)

    const menu = new Menu()
    menu.trigger(events.onShowMenu)

    expect(mockCallback).toBeCalledTimes(1)
    spy.mockRestore()
  })
})

describe(`test Menu Component's handleHide method`, () => {
  it('should call handleHide method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(Menu.prototype, 'handleHide').mockImplementation(mockCallback)

    const menu = new Menu()

    menu.trigger(events.onHideMenu)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it(`should set style.display = 'none'`, () => {
    const menu = new Menu()
    menu.trigger(events.onHideMenu)
    expect(menu.root).toHaveStyle(`display:none;`)
  })

  it(`should remove all menuItemHover class`, () => {
    const menu = new Menu()
    menu.trigger(events.onRefreshMenu, {
      opts: [
        'a', 'b', 'c',
      ]
    })

    menu.root.firstElementChild.classList.add(classes.menuItemHover)
    menu.trigger(events.onHideMenu)

    expect(menu.root.firstElementChild).not.toHaveClass(classes.menuItemHover)
  })
})


describe(`test Menu Component's handleInput method`, () => {
  it('should call handleInput method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(Menu.prototype, 'handleInput').mockImplementation(mockCallback)

    const menu = new Menu()

    menu.trigger(events.onInput)

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it('should trigger onShowMenu event', () => {
    const menu = new Menu()

    const mockCallback = jest.fn()
    menu.on(events.onShowMenu, mockCallback)

    menu.trigger(events.onInput, 'whatever')

    expect(mockCallback).toBeCalledTimes(1)
  })

  it('should trigger onHideMenu event', () => {
    const menu = new Menu()

    const mockCallback = jest.fn()
    menu.on(events.onHideMenu, mockCallback)

    menu.trigger(events.onInput, '')

    expect(mockCallback).toBeCalledTimes(1)
  })
})
