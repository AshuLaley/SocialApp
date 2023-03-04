const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const port = 8000;
const cookieParser = require('cookie-parser');
const app = express();

const db = require('./config/mongoose');
const bodyParser = require('body-parser');

const session =  require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const  sassMiddleware = require('mode-sass-middleware');


app.use(sassMiddleware({
    src:'/assets/scss',
    dest:'/assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}))

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

//set view engine
app.set('view engine','ejs');
app.set('views','./views');

//extract styles and scripts written in ejs files.
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(express.static('./assets'));

app.use(expressEjsLayouts);


//mongo store is used to store the session cookie in the db
app.use(session({
    name:'Codeial',
    //TODO change the secret before deployment in production mode
    secret: 'Blahnowayblah',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: (1000*60*100)
    },
    store:new MongoStore({
            mongooseConnection: db,
            autoRemove:'disabled'
    },
    function(err){
        console.log(err || 'connect-mongodb setup ok')
    }
    )
}));


app.use(passport.initialize());
app.use(passport.session());


app.use(passport.setAuthenticatedUser);

//use express routes
app.use('/', require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    
    console.log(`server is up and running on port: ${port}`); 
   
});