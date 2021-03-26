const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(conn => {
        console.log(`mongodb is connected to host: ${conn.connection.host}`);
    });
}
module.exports = connectDatabase