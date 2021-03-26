const app = require('./app');
const connectDatabase = require('./config/dataBase');



const dotenv = require('dotenv');
// Handling Uncaught Exception
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down due to uncaught exception.')
    process.exit(1);
});

//setting envirment variable
dotenv.config({path: 'backend/config/config.env'});

//connecting database
connectDatabase();




app.listen(process.env.PORT, () => {
    console.log(`server is on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})