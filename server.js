//jshint esversion:6
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').parse();
}

const express = require("express");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const app = express();

const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
require('dotenv').config();
const mongoose = require('mongoose');
mongoose
    .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to Mongoose!');
    })
    .catch((err) => {
        console.error('Error connecting to Mongoose', err);
    });


app.use('/', indexRouter);
app.get("/", function(req,res){

  res.send("hey there");
});

app.listen(3000, function(){
  console.log("Server started on port 3000");
});
