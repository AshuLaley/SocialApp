const passport = require('passport');

const localStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport
passport.use(new localStrategy({
        usernameField:'email'
    },
    function(email,password,done){
        //find a user and establish identity
        User.findOne({email:email}, function(err,user){
            if(err){
                console.log('Error in Finding user --> Passport');
                return done(err);
            }

            if(!user || user.password != password){
                console.log('Invalid Username/Password');
                return done(null,false);
            }

            return done(null, user);
        });
    }

));


//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing the user from the key in cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null,user);

    });
});


// check if user is authenticated
passport.checkAuthentication = function(req,res,next){
    //if user is logged in
    if(req.isAuthenticated){
        return next();
    }

    //if user is not logged in
    return res.redirect('/users/log-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie an we are just sendng this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;