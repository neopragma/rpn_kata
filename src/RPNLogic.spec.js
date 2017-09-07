const expect = require('chai').expect;

class RPNLogic {
  reduce(input) {
    if (!Array.isArray(input)) throw('input must be an array');
    return input;
  }
}

describe('RPNLogic', () => {

  let rpn;

  beforeEach(() => {
    rpn = new RPNLogic();
  });

  it('should throw if the input is not an array', () => {
    expect(() => rpn.reduce()).to.throw();
  });

  it('should return an empty array if input is empty', () => {
    expect(rpn.reduce([])).to.deep.equal([]);
  });
});
