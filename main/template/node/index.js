const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
var welcome = require('./controllers/welcome')


var app = express();

app.use(bodyParser.json());
app.use(cors());

app.listen (3000, () => console.log('server started successfully at port : 3000'));
app.use('/welcome', welcome);