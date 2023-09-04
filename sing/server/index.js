const dobcontroller = require('./controllers/dob');
const swingcontroller = require('./controllers/swing');
const minecontroller = require('./controllers/mine');
const sedcontroller = require('./controllers/sed');
const samcontroller = require('./controllers/sam');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
var welcome = require('./controllers/welcome')


var app = express();

app.use(bodyParser.json());
app.use(cors());

app.listen (3000, () => console.log('server started successfully at port : 3000'));
app.use('/welcome', welcome);
    app.use('/sam', samcontroller);
    
    app.use('/sed', sedcontroller);
    
    app.use('/mine', minecontroller);
    
    app.use('/swing', swingcontroller);
    
    app.use('/dob', dobcontroller);
    