class AddStrategy {
  static get op() {
    return '+';
  }

  calculate(operandA, operandB) {
    return operandA + operandB;
  }
}

class SubtractStrategy {
  static get op() {
    return '-';
  }

  calculate(operandA, operandB) {
    return operandA - operandB;
  }
}

class RPNLogic {
  constructor() {
    this.opStrategies = {
      [AddStrategy.op]: new AddStrategy(),
      [SubtractStrategy.op]: new SubtractStrategy()
    };
  }

  reduce(input) {
    if (!Array.isArray(input)) throw('input must be an array');
    if (!this.isArrayValid(input)) throw('input must contain all valid elements');

    let stack = [];
    input.forEach(el => {
      if (typeof(el) === 'number') stack.push(el);
      else this.executeStrategy(stack, el);
    });

    return stack;
  }

  executeStrategy(stack, el) {
    let {operandA, operandB} = this.retrieveOperandPair(stack);
    let opStrategy = this.opStrategies[ el ];
    stack.push(opStrategy.calculate(operandA, operandB));
  }

  retrieveOperandPair(stack) {
    return {
      operandB: this.retrieveOperand(stack),
      operandA: this.retrieveOperand(stack)
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
    return typeof(element) === 'number' || Object.keys(this.opStrategies).includes(element);
  }
}

module.exports = {
  RPNLogic,
  AddStrategy,
  SubtractStrategy
};