const express = require('express');
const port = 8000;

const app = express();


//set view engine
app.set('view engine','ejs');
app.set('views','./views');

//use express routes
app.use('/', require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    
    console.log(`server is up and running on port: ${port}`); 
   
});