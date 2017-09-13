import RPNGateway from 'RPNGateway';
// const RPNGateway = require('RPNGateway');

const initialState = {
  error: false,
  values: [],
  operations: [ '+', '-', '*', '/' ], // Be nice if these came from the op
                                      // strategies
  input: ''
};

class Calculator extends React.Component {
  constructor() {
    super();
    this.gateway = new RPNGateway(); // Should be injected... (how?)
    this.state = initialState;

    // OMG this is ugly, React, really ugly. Or should I blame ESNext subclassing.
    this.inputDidChange = this.inputDidChange.bind(this);
  }

  userDidPressEnter() {
    if (this.state.error) return;
    this.pushToValuesIfNumeric(this.state.input);
    this.setState({input: ''});
    this.requestCalculation();
  }

  userDidPressOperator(op) {
    if (this.state.error) return;
    this.addToValues(op);
    this.requestCalculation();
  }

  userDidPressClear() {
    this.setState({
      values: [],
      error: false
    });
  }

  pushToValuesIfNumeric(input) {
    let value = parseFloat(input);
    if (!isNaN(value)) {
      this.addToValues(parseFloat(this.state.input));
    }
  }

  addToValues(value) {
    this.state.values.push(value);
    this.setState({values: this.state.values});
  }

  inputDidChange(event) {
    let newValue = event.target.value.replace(/[^0-9\.]/g, '');
    this.setState({input: newValue});
  }

  requestCalculation() {
    this.gateway.reduce(this.state.values)
      .then(data => this.setState({
        values: data,
        error: false
      }))
      .catch(() => this.setState({error: true}));
  }

  statusClass() {
    return this.state.error ? 'error' : '';
  }

  render() {
    return (
      <section className="calculator">
          <ol className={this.statusClass()}>
            {this.state.values.map(v => <li>{v}</li>)}
          </ol>
        <section className="input">
          <input type="text" value={this.state.input}
                 placeholder="Click to type a number"
                 onChange={this.inputDidChange}></input>
          <button
            onClick={() => this.userDidPressEnter()}>Enter
          </button>
        </section>
        <ul>
          {this.state.operations.map(op => {
            return <li>
              <button
                onClick={() => this.userDidPressOperator(op)}>{op}</button>
            </li>;
          })}
          <li>
            <button onClick={() => this.userDidPressClear()}>Clear</button>
          </li>
        </ul>
      </section>
    );
  }
}

ReactDOM.render(<Calculator/>, document.getElementById('app'));