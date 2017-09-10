const expect = require('chai').expect;
const { RPNLogic, addOp } = require('./RPNLogic');

describe('RPNLogic', () => {

  let rpn;

  beforeEach(() => {
    rpn = new RPNLogic();
  });

  describe('.isElementValid', () => {

    it('should determine that non-numbers and non-operators are invalid', () => {
      expect(rpn.isElementValid('a')).to.equal(false);
    });

    it('should determine that a number is valid', () => {
      expect(rpn.isElementValid(1)).to.equal(true);
    });

    it('should determine an operator is valid', () => {
      [addOp].forEach(op => {
        expect(rpn.isElementValid(op)).to.equal(true);
      });
    });

  });

  describe('.reduce', () => {

    it('should throw if the input is not an array', () => {
      expect(() => rpn.reduce()).to.throw();
    });

    it('should return an empty array if input is empty', () => {
      expect(rpn.reduce([])).to.deep.equal([]);
    });

    it('should not accept invalid characters in the array (only 0-9,+,/,*,-)', () => {
      expect(() => rpn.reduce(['hello'])).to.throw();
    });

    it('should not be able to reduce if only operands', () => {
      const operandList = [1,2,3];
      expect(rpn.reduce(operandList)).to.deep.equal(operandList);
    });

    it('should throw exception if only a single operand is available for an operator', () => {
      expect(() => rpn.reduce([1,'+'])).to.throw();
    });

    it('should be able to add two numbers', () => {
      expect(rpn.reduce([1, 2, addOp])).to.deep.equal([3]);
    });

    it('should be able to add a few numbers', () => {
      expect(rpn.reduce([1,2,3,'+','+'])).to.deep.equal([6]);
    });

  });

});
