export default class RPNGateway {
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