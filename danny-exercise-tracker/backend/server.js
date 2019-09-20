const express = require('express');
const cors =require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();




const app = express();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri , { useNewUrlParser : true , useCreateIndex :true, seUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open' , () => {
   console.log('mongo db successfull connected')
})

// bodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const UsersRouter = require('./routes/users');
const exerciseRouter = require('./routes/exercises');


app.use('/users',UsersRouter);
app.use('/excercises',exerciseRouter);


app.use(cors());
app.use(express.json());





const PORT = process.env.PORT || 3000;

app.listen(PORT , () => {
   console.log(`applicaion is running on ${PORT}`);
})