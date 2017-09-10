const addOp = '+';

class RPNLogic {
  constructor() {
    this.validOps = [ addOp ];
  }

  reduce(input) {
    if (!Array.isArray(input)) throw('input must be an array');
    if (!this.isArrayValid(input)) throw('input must contain all valid elements');

    let stack = [];
    input.forEach(el => {
      if (typeof(el) === 'number') {
        stack.push(el);
      } else {
        let {operandA, operandB} = this.retrieveOperandPair(stack);
      }
    });

    return stack;
  }

  retrieveOperandPair(stack) {
    return {
      operandA: this.retrieveOperand(stack),
      operandB: this.retrieveOperand(stack)
    };
  }

  retrieveOperand(stack) {
    let operand = stack.pop();
    if (typeof(operand) === 'undefined') throw('not enough operands for operator');
    return operand;
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