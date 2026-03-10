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
app.set('view engine', 'jade');                     // set de view engine

app.use(logger('dev'));                             // use de logger
app.use(express.json());                            // use de express.json            
app.use(express.urlencoded({ extended: false }));     // use de express.urlencoded
app.use(cookieParser());                            // use de cookieParser        
app.use(express.static(path.join(__dirname, 'public')));    // use de express.static

app.use('/', indexRouter);                          // use de index


// catch 404 and forward to error handler
app.use(function(req, res, next) {                  // route de 404       
  next(createError(404));                           // laisse passer
});

// error handler
app.use(function(err, req, res, next) {              // route d'erreur
  // set locals, only providing error in development
  res.locals.message = err.message;                   // message
  res.locals.error = req.app.get('env') === 'development' ? err : {};            // erreur

  // render the error page
  res.status(err.status || 500);                      // status
  res.render('error');                                // render
});
//export
module.exports = app;
