class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      input: ''
    };

    // OMG this is ugly, React, really ugly.
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({input: event.target.value});
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.input}
               onChange={this.handleChange}></input>
      </div>
    );
  }
}

ReactDOM.render(<Calculator/>, document.getElementById('app'));