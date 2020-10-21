const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index');

const fbMessengerRouter = require('./routes/fb-messenger');

mongoose.connect('mongodb://mongodb:27017/fb_agent', { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
const database = mongoose.connection;
database.on('error', console.error.bind(console, 'CONNECTION ERROR'))
database.once('open', () => {
    // Db connnected
    console.log('DB CONNECTED')
})

const app = express();

app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/', fbMessengerRouter);
module.exports = app;