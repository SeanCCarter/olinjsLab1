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

// Home Page
app.get('/', index.home);

// GET Requests
app.get('/getTopicList', index.getTopicList)
app.get('/getArticle', index.getArticle)

// POST Requests
app.post('/newTopic', index.newTopic);
app.post('/editTopic', index.editTopic);

app.listen(3000);
