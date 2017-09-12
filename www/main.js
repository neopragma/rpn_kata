class RPNGateway {
  get headers() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return headers;
  }

  reduce(values) {
    return fetch('/api/v1/reduce', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: this.headers
    })
      .then(response => {
        if (response.status === 400) throw('Invalid input.');
        return response.json();
      });
  }
}

class Calculator extends React.Component {
  constructor() {
    super();
    this.gateway = new RPNGateway(); // Should be injected... (how?)
    this.state = {
      error: false,
      values: [],
      operations: [ '+', '-', '*', '/' ], // Be nice if these came from the op strategies
      input: ''
    };

    // OMG this is ugly, React, really ugly.
    this.inputDidChange = this.inputDidChange.bind(this);
  }

  inputDidChange(event) {
    let newValue = event.target.value.replace(/[^0-9\.]/g, '');
    this.setState({input: newValue});
  }

  requestCalculation() {
    this.gateway.reduce(this.state.values)
      .then(data => this.setState({values: data, error: false}))
      .catch(() => this.setState({error: true}));
  }

  userDidPressEnter() {
    if (this.state.error) return;
    let value = parseFloat(this.state.input);
    if (!isNaN(value)) {
      this.addToValues(parseFloat(this.state.input));
    }
    this.setState({input: ''});
    this.requestCalculation();
  }

  userDidPressOperator(op) {
    if (this.state.error) return;
    this.addToValues(op);
    this.requestCalculation();
  }

  userDidPressClear() {
    this.setState({values: [], error: false});
  }

  addToValues(value) {
    this.state.values.push(value);
    this.setState({values: this.state.values});
  }

  statusClass() {
    return this.state.error ? 'error':'';
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.input}
               onChange={this.inputDidChange}></input>
        <input type="submit" value="Enter"
               onClick={() => this.userDidPressEnter()}></input>
        <ul>
          {this.state.operations.map(op => {
            return <li>
              <button onClick={() => this.userDidPressOperator(op)}>{op}</button>
            </li>;
          })}
          <li><button onClick={() => this.userDidPressClear()}>Clear</button></li>
        </ul>
        <ol className={this.statusClass()}>
          {this.state.values.map(v => <li>{v}</li>)}
        </ol>
      </div>
    );
  }
}

ReactDOM.render(<Calculator/>, document.getElementById('app'));