const express = require('express');
const app = express();
const test = require('./Router/test');
const port = 5000;

const connect = require('./schemas');
connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', test);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
