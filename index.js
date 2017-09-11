const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { RPNLogic } = require('./src/RPNLogic');

const rpn = new RPNLogic();

app.use(bodyParser.json());
app.use('/', express.static('www'));

app.post('/api/v1/reduce', (req, res) => {
  const input = req.body;
  const output = rpn.reduce(input);
  res.send(output);
});

app.listen(3000, () => console.log('Listening on port 3000'));