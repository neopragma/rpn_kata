const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { RPNLogic } = require('./src/RPNLogic');

const rpn = new RPNLogic();

app.use(bodyParser.json());
app.use('/', express.static('www'));

app.post('/api/v1/reduce', (req, res) => {
  const input = req.body;
  let output;
  try {
    output = rpn.reduce(input);
  } catch(err) {
    output = input;
    res.status(400);
  }
  res.send(output);
});

app.listen(3000, () => console.log('Listening on port 3000'));