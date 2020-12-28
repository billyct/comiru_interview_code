/* jshint ignore:start */
const ComponentFunc = require('../component')

describe('test ComponentFunc', () => {
  it('should have the same listeners when init with ComponentFunc()', () => {
    const C = ComponentFunc()
    const c1 = new C()
    const c2 = new C()

    expect(c1.listener).toBe(c2.listener)
  })

  it('should have the difference listeners when init with ComponentFunc', () => {
    const C1 = ComponentFunc()
    const C2 = ComponentFunc()
    const c1 = new C1
    const c2 = new C2

    expect(c1.listener === c2.listener).toBeFalsy()
  })

  it('should call the mockCallback with the right args', async () => {
    const C = ComponentFunc()
    const c1 = new C()

    const mockCallback = jest.fn()

    const eventType = 'test_type'
    const eventValue = 'test_value'

    c1.on(eventType, mockCallback)
    c1.trigger(eventType, eventValue)

    expect(mockCallback).toBeCalledTimes(1)
    expect(mockCallback).toHaveBeenCalledWith(new CustomEvent(eventType, {
      detail: {
        value: eventValue,
      }
    }))
  })

  it('should call the mockCallback twice', () => {
    const C = ComponentFunc()
    const c1 = new C()
    const c2 = new C()

    const mockCallback = jest.fn()
    const eventType = 'test_type_1'

    c1.on(eventType, mockCallback)
    c2.on(eventType, mockCallback)

    c1.trigger(eventType)

    expect(mockCallback).toBeCalledTimes(2)
  })
})

/* jshint ignore:end */
