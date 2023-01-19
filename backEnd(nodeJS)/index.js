var express = require("express");
var app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = 5000;


app.use((bodyParser.urlencoded({extended: false})))
app.use((bodyParser.json({limit: '100mb'})))
app.use(express.json());
app.use(cors({
    origin: '*'
}))

// DB CONNECTION
require('./db_properties');

// Routes import
const authRoutes = require('./routing/authRouting');
const customerSchedulemodel = require("./models/customerSchedulemodel");
app.use('/auth',authRoutes) 

app.listen(PORT , () => {
    console.log(`app running on port ${PORT}`)
});

