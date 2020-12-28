/* jshint ignore:start */
const {mixin} = require('../utils')

describe('test mixin function', () => {

  it('should mixin two functions', () => {
    function A(x, y) {
      this.x = x;
      this.y = y;
    }

    A.prototype.move = function(x, y) {
      this.x += x;
      this.y += y;
    }

    function B(x, y, r) {
      // Call constructor of superclass to initialize superclass-derived members.
      A.call(this, x, y);
      // Initialize subclass's own members
      this.r = r;
    }

    mixin(B, A)

    const b = new B(1, 2, 3)

    expect(b.x).toBe(1)
    expect(b.y).toBe(2)
    expect(b.r).toBe(3)
    expect(b instanceof A).toBeTruthy()
    expect(b instanceof B).toBeTruthy()

    b.move(1,1)
    expect(b.x).toBe(2)
    expect(b.y).toBe(3)
  })

  it('should mixin function with object', () => {

    function D(d) {
      this.d = d;
    }

    mixin(D, {
      a: 1,
      b: 2,
      c: () => true,
    })

    const d = new D(1)
    expect(d.a).toBe(1)
    expect(d.b).toBe(2)
    expect(d.c()).toBeTruthy()
    expect(d.d).toBe(1)
  })
})

/* jshint ignore:end */
