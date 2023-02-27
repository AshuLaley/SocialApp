const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

db.on('error',console.error.bind("Error connecting to mongoDB"));

db.once('open',function(){
    console.log('Connected to database :: MongoDB');
})

module.exports = db;