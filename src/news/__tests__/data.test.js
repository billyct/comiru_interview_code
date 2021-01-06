/* jshint ignore:start */
const ComponentFunc = require('../../common/component')
const DataFunc = require('../data')
const events = require('../events')

let Data

beforeEach(() => {
  Data = DataFunc(ComponentFunc())
})

describe(`test Data Component's constructor`, () => {
  it('should be correct', () => {
    const data = new Data()

    expect(data.data).toEqual([])
    expect(data.result).toEqual([])
    expect(data.resultPerPage).toEqual(5)
    expect(data.resultPage).toEqual(1)
  })
})


describe(`test Data Component's next method`, () => {
  it('should correct', () => {
    const data = new Data()
    data.result = ['a', 'b', 'c']
    data.resultPerPage = 1

    expect(data.next()).toEqual(['a'])
    expect(data.next()).toEqual(['b'])
    expect(data.next()).toEqual(['c'])
  })

  it('should trigger onShowNext event', () => {
    const data = new Data()
    const mockCallback = jest.fn()
    data.on(events.onShowNext, mockCallback)

    data.result = ['a', 'b', 'c']
    data.resultPerPage = 2

    expect(data.next()).toEqual(['a', 'b'])
    expect(mockCallback).toBeCalledTimes(1)
  })

  it('should trigger onHideNext event', () => {
    const data = new Data()
    const mockCallback = jest.fn()
    data.on(events.onHideNext, mockCallback)

    data.result = ['a', 'b', 'c']
    data.resultPerPage = 2
    data.resultPage = 2

    expect(data.next()).toEqual(['c'])
    expect(mockCallback).toBeCalledTimes(1)
  })
})

describe(`test Data Component's get method`, () => {
  it('should call search method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(Data.prototype, 'search').mockImplementation(mockCallback)
    const data = new Data()

    data.get()

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it('should get data from this.data', () => {
    const data = new Data()
    data.data = ['a', 'b', 'c']
    data.resultPerPage = 2

    expect(data.get()).toEqual(['a', 'b'])
  })
})

describe(`test Data Component's search method`, () => {
  it('should call next method', () => {
    const mockCallback = jest.fn()
    const spy = jest.spyOn(Data.prototype, 'next').mockImplementation(mockCallback)
    const data = new Data()

    data.search()

    expect(mockCallback).toBeCalledTimes(1)

    spy.mockRestore()
  })

  it('should correct', () => {
    const data = new Data()
    const dataFiltered = ['a', 'b']
    const spy = jest.spyOn(Array.prototype, 'filter').mockImplementation(() => dataFiltered)
    data.data = ['a', 'b', 'c']
    data.resultPerPage = 1

    data.search('whatever')

    expect(JSON.stringify(data.search('a'))).toStrictEqual(JSON.stringify(['a']))
    expect(JSON.stringify(data.result)).toStrictEqual(JSON.stringify(dataFiltered))
    expect(data.resultPage).toBe(2)

    spy.mockRestore()
  })
})
