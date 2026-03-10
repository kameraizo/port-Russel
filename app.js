var createError = require('http-errors');   // import de createError
var express = require('express');           // import de express
var path = require('path');                 // import de path
var cookieParser = require('cookie-parser');    // import de cookieParser
var logger = require('morgan');             // import de logger

var indexRouter = require('./routes/index');         // import de index


var app = express();                         // appel de express

var cors = require('cors')                   // import de cors
var session = require('express-session')      // import de express-session
var connectDB = require('./db/mongo')         // import de connectDB

connectDB()                                   // appel de connectDB

app.use(cors())                               // use de cors
app.use(session({                             // use de express-session               
  secret: process.env.SECRET_KEY,             // clé secrète
  resave: false,                              // pas de resave
  saveUninitialized: false                    // pas de saveUninitialized
}))





// view engine setup
app.set('views', path.join(__dirname, 'views'));    // set de views
app.set('view engine', 'ejs');                     // set de view engine

app.use(logger('dev'));                             // use de logger
app.use(express.json());                            // use de express.json            
app.use(express.urlencoded({ extended: false }));     // use de express.urlencoded
app.use(cookieParser());                            // use de cookieParser        
app.use(express.static(path.join(__dirname, 'public')));    // use de express.static

app.use('/', indexRouter);                          // use de index
app.use(function(req, res, next) {                  // use de function
  next(createError(404));                           // next de createError
});


app.use(function(err, req, res, next) {              // route d'erreur
  res.status(err.status || 500)                   // status
  res.render('error', {                            // render
    message: err.message,                          // message
    status: err.status || 500                              // status
  });                                                   
});
//export
module.exports = app;
