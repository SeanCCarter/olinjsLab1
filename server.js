var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser');
    mongoose = require('mongoose');
    index = require('./routes/index')

mongoose.connect('mongodb://localhost/cardWiki');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.home);

app.listen(3000);
