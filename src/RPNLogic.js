const addOp = '+';

class RPNLogic {
  constructor() {
    this.validOps = [ addOp ];
  }

  reduce(input) {
    if (!Array.isArray(input))
      throw('input must be an array');
    if (!this.isArrayValid(input))
      throw('input must contain all valid elements');

    let stack = [];
    input.forEach(el => {
      stack.push(el);
    });

    return stack;
  }

  isArrayValid(input) {
    return input.reduce((stillValid, el) => stillValid && this.isElementValid(el), true);
  }

  isElementValid(element) {
    return typeof(element) === 'number' || this.validOps.includes(element);
  }
}

module.exports = {
  RPNLogic,
  addOp
};