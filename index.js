const createError = require('http-errors');
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const cookieParser = require('cookie-parser');

const PORT = 5000;
const heroRouter = require('./routes/hero/index');

let app = express()
app.use(bodyParser.json({ type: 'application/json' }));
app.use(cors())

app.all("*", (req, res, next) => {
    // CORS headers
    res.header(
        "Access-Control-Allow-Origin",
        "*"
    );
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "*"
    );
    if ("OPTIONS" === req.method) {
        res.send(200);
    } else {
        next();
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



//routes
app.use('/heroes', heroRouter);



app.use(function(err, req, res, next) {
  // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};


    // render the error page
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});

module.exports = app;
