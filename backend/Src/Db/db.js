const mongoose = require('mongoose');

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
            .then(() => {
                console.log('Now Server is connected to database');
            })
    } catch (error) {
        console.log("Database connection fail", error);
    }
}
module.exports = connectToDb