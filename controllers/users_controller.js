const User = require('../models/user')


module.exports.profile = function(req,res){
        
        if(!req.isAuthenticated()){
        return res.redirect('/users/log-in');
        }

        return res.render('user_profile',{
            title: 'User Profile'
        })
}

module.exports.posts = function(req,res){
    res.end('<h1> Personalized Posts for user</h1>');
}


//render the sign up page
module.exports.signUp = function(req,res){

    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }

    return res.render('user_signup',{
        title: 'Codeial | Sign Up'
    })
}

// Render the log in page
module.exports.LogIn = function(req,res){

    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }

    return res.render('user_login',{
        title:'Codeial | Log In'
    })
}

//get the signup data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up');return;}

        if(!user){
            User.create(req.body, function(err,user){
                if(err){console.log('error in finding user in signing up');return;}

                return res.redirect('/users/log-in');
            })
        }
    })
}

//Log in and create a session for a user.
module.exports.createSession = function(req,res){
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}