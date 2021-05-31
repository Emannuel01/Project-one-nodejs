const express = require('express');
const router = require('./routes');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use(router);

app.listen(8001);
console.log('server run')