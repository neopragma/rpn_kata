const expect = require('chai').expect;

class RPNLogic {
  reduce() {}
}

describe('RPNLogic', () => {
  it('should have a reduce method', () => {
    const rpn = new RPNLogic();
    expect(rpn.reduce).to.exist
  });
});
