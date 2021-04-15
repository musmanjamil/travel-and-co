const Tour = require('../models/tour');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const tours= require('../data/tours');

// Setting dotenv file
dotenv.config({ path: 'config/config.env' })

connectDatabase();

const seedTours = async () => {
    
    try {

        await Tour.deleteMany({});
        console.log('Tours are deleted');

        await Tour.insertMany(tours)
        console.log('All Tours are added.')

        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedTours()