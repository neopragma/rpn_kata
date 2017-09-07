const expect = require('chai').expect;

class RPNLogic {
  reduce(input) {
    if (!Array.isArray(input)) throw('input must be an array');

    return input;
  }

  isValid(input) {
    let validOperator = /[+-/*]/;
    return typeof(input) === 'number' || input.match(validOperator) !== null;
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

  it('should have a method to determine if an element in the array is valid', () => {
    expect(rpn.isValid('a')).to.equal(false);
  });

  xit('should not accept invalid characters in the array (only 0-9,+,/,*,-)', () => {
    expect(() => rpn.reduce(['hello'])).to.throw();
  });

});
