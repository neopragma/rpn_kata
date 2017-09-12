class RPNGateway {
  get headers() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return headers;
  }

  reduce(values) {
    console.log(values);
    return fetch('/api/v1/reduce', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: this.headers
    })
      .then(response => response.json());
  }
}

class Calculator extends React.Component {
  constructor() {
    super();
    this.gateway = new RPNGateway(); // Should be injected... (how?)
    this.state = {
      values: [ 1, 2, '+' ],
      operations: [ '+', '-' ],
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
      .then(data => this.setState({values: data}));
  }

  userDidPressEnter() {
    this.addToValues(this.state.input);
    this.requestCalculation();
  }

  addToValues(value) {
    this.state.values.push(parseFloat(value));
    this.setState({values: this.state.values});
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
              <button>{op}</button>
            </li>;
          })}
        </ul>
        <ol>
          {this.state.values.map(v => <li>{v}</li>)}
        </ol>
      </div>
    );
  }
}

ReactDOM.render(<Calculator/>, document.getElementById('app'));