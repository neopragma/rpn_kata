const expect = require('chai').expect;

class RPNLogic {
  reduce(input) {
    if (!Array.isArray(input)) throw('input must be an array');
  }
}

describe('RPNLogic', () => {
  it('should throw if the input is not an array', () => {
    const rpn = new RPNLogic();
    expect(() => rpn.reduce()).to.throw();
  });
});
