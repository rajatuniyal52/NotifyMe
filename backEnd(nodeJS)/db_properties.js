const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/Notifyme';// coonevting it with database local host ,
// grocery is database name in mongodb

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}

const connectWithDB = () => {
    mongoose.connect(url, options, (err) => {
      if (err) console.error(err);
      else console.log("database connected")
    })
}



connectWithDB()
