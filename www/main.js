class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      values: [ 1, 2, 3 ],
      input: ''
    };

    // OMG this is ugly, React, really ugly.
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let newValue = event.target.value.replace(/[^0-9\.]/g, '');
    this.setState({input: newValue});
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.input}
               onChange={this.handleChange}></input>
        <ol>
          {this.state.values.map(v => <li>{v}</li>)}
        </ol>
      </div>
    );
  }
}

ReactDOM.render(<Calculator/>, document.getElementById('app'));