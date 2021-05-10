const express = require('express');
const app = express();
const cloudinary = require("cloudinary");



const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const dotenv = require('dotenv');

const errorMiddleware = require('./middleware/errors');


//setting envirment variable
dotenv.config({path: 'config/config.env'});

// Set up body parser
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.use(express.json());

app.use(cookieParser());

// Handle file uploads
app.use(fileUpload());


// Setting up config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


//import all routes
const auth = require('./routes/auth');
const tour = require('./routes/tour');
const booking = require('./routes/booking');



//mount routes
app.use('/api/v1', auth);
app.use('/api/v1', tour);
app.use('/api/v1', booking);



//middleware to handle errrors
app.use(errorMiddleware);


module.exports = app;