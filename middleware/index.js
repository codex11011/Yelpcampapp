//all the middleware goes here

var middlewareObj = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");

middlewareObj.checkCampgroundOwnership = function(req,res,next){
	//middleware for checking authorization of user over campground
	if(req.isAuthenticated()){
		Campground.findById(req.params.id,function(err,foundCampground){
		if(err){
			req.flash("error","Campground not found");
			res.redirect("back");
		}
		else{
			//campground.author.id - mongoose object
			//req.user._id - string
			if(foundCampground.author.id.equals(req.user._id)){
				next();//we want it to delete something or update something
			}//after  checking for authorization the authorized user can delete or update the campground  
			else{
				req.flash("error","You don't have permission to do that");
				res.redirect("back");
			}
		}
	});
	}
	 else{
	 	req.flash("error","You need to be Logged in to do that");
		res.redirect("back");//take user back from where they came
	} 
}

middlewareObj.checkCommentOwnership = function(req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err){
			res.redirect("back");
		}
		else{
			//foundComment.author.id - mongoose object
			//req.user._id - string
			//user id stored in req.user._id thanks to passport
			if(foundComment.author.id.equals(req.user._id)){
				next();//we want it to delete something or update something
			}//after  checking for authorization the authorized user can delete or update the comment  
			else{
				req.flash("error","You don't have the permission to do that"); 
				res.redirect("back");
			}
			
		}
	});
	} else{
		req.flash("error","You need to be logged in to do that");
		res.redirect("back");//take user back from where they came
	}
}

//middleware for checking if user is logged-in or not
middlewareObj.isLoggedIn =  function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","You need to be Logged in to do that!");
	res.redirect("/login");
}


module.exports = middlewareObj;
