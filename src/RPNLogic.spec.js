const expect = require('chai').expect;

const addOp = '+';

class RPNLogic {
  constructor() {
    this.validOps = [ addOp ];
  }

  reduce(input) {
    if (!Array.isArray(input)) throw('input must be an array');

    return input;
  }

  isValid(input) {
    return typeof(input) === 'number' || this.validOps.includes(input);
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

  describe('.isValid', () => {

    it('should determine that non-numbers and non-operators are invalid', () => {
      expect(rpn.isValid('a')).to.equal(false);
    });

    it('should determine that a number is valid', () => {
      expect(rpn.isValid(1)).to.equal(true);
    });

    it('should determine an operator is valid', () => {
      [addOp].forEach(op => {
        expect(rpn.isValid(op)).to.equal(true);
      });
    });

  });

  xit('should not accept invalid characters in the array (only 0-9,+,/,*,-)', () => {
    expect(() => rpn.reduce(['hello'])).to.throw();
  });

});
