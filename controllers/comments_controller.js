const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.create = function(req,res){

    if(!req.isAuthenticated()){
        return res.redirect('/users/log-in');
    }

    Post.findById(req.body.post, function(err,post){
        if(err){
            console.log('error in creating a post (finding post by id)'); return;
        }

        if(post){

            Comment.create({
                content: req.body.content,
                post:req.body.post,
                user:req.user._id
            }, function(err,comment){
                if(err){
                    console.log('error in creating a post'); return;
                }
                

                post.comments.push(comment);
                post.save();

                return res.redirect('/');
            });
        }
        }
    )

    
}