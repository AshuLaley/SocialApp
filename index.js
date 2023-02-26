const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const port = 8000;

const app = express();


//set view engine
app.set('view engine','ejs');
app.set('views','./views');

//extract styles and scripts written in ejs files.
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(express.static('./assets'));

app.use(expressEjsLayouts);

//use express routes
app.use('/', require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    
    console.log(`server is up and running on port: ${port}`); 
   
});