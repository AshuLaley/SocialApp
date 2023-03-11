const Post =require('../models/post');

module.exports.home = function(req,res){
   // console.log(req.cookies);

   // Post.find({},function(err,posts){
   //    return res.render('home',{
   //       title:"Home",
   //       posts: posts
   //    });
   // })

   Post.find({})
   .populate('user')
   .populate({
      path: 'comments',
      populate:{
         path: 'user',
         select: 'name'
      }
   })
   .exec(function(err,posts){
      return res.render('home',{
         title:"Home",
         posts: posts
   
      });
   })
   
}

//module.exports.actionname = function(req,res){}