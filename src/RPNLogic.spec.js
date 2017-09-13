const expect = require('chai').expect;
const { RPNLogic, AddStrategy, SubtractStrategy, MultiplyStrategy, DivideStrategy, standardCalculatorStrategies } = require('./RPNLogic');

describe('RPNLogic', () => {

  let rpn;

  beforeEach(() => {
    rpn = new RPNLogic(standardCalculatorStrategies);
  });

  describe('.isElementValid', () => {

    it('should determine that non-numbers and non-operators are invalid', () => {
      expect(rpn.isElementValid('a')).to.equal(false);
    });

    it('should determine that a number is valid', () => {
      expect(rpn.isElementValid(1)).to.equal(true);
    });

    it('should determine an operator is valid', () => {
      [AddStrategy].forEach(strategy => {
        expect(rpn.isElementValid(strategy.op)).to.equal(true);
      });
    });

  });

  describe('.isArrayValid', () => {

    it('should evaluate an empty array as valid', () => {
      expect(rpn.isArrayValid([])).to.equal(true);
    });

    it('should be able to determine whether a whole array is valid', () => {
      expect(rpn.isArrayValid([1, 2, 3, 4, 5, AddStrategy.op, SubtractStrategy.op])).to.equal(true);
    });

  });

  describe('.reduce', () => {

    function expect_rpn_result(check) {
      expect(rpn.reduce(check.input)).to.deep.equal(check.expected);
    }

    it('should throw if the input is not an array', () => {
      expect(() => rpn.reduce()).to.throw();
    });

    it('should return an empty array if input is empty', () => {
      expect_rpn_result({ input: [], expected: [] });
    });

    it('should not accept invalid characters in the array (only 0-9,+,/,*,-)', () => {
      expect(() => rpn.reduce(['hello'])).to.throw();
    });

    it('should not be able to reduce if only operands', () => {
      const operandList = [1,2,3];
      expect_rpn_result({ input: operandList, expected: operandList });
    });

    it('should throw exception if only a single operand is available for an operator', () => {
      expect(() => rpn.reduce([1,'+'])).to.throw();
    });

    it('should be able to add two numbers', () => {
      expect_rpn_result({ input: [1, 2, AddStrategy.op], expected: [3] });
    });

    it('should be able to add a few numbers', () => {
      expect_rpn_result({ input: [1,2,3,AddStrategy.op,AddStrategy.op], expected: [6] });
    });

    it('should be able to subtract', () => {
      expect_rpn_result({ input: [2, 1, SubtractStrategy.op], expected: [1] });
    });

    it('should be able to multiply', () => {
      expect_rpn_result({ input: [2, 2, MultiplyStrategy.op], expected: [4] });
    });

    it('should be able to divide', () => {
      expect_rpn_result({ input: [8, 2, DivideStrategy.op], expected: [4] });
    });

  });

});
