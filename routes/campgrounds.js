
//express router
var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index.js");

router.get("/",function(req,res){

		Campground.find({},function(err,allcampgrounds){
			if(err){
				console.log(err);
			}else{
				res.render("campgrounds/Index",{campgrounds:allcampgrounds});		
			}
		});	
			
});
router.post("/",middleware.isLoggedIn,function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		id:req.user._id,
		username:req.user.username
	}
	var newcampground = {
			name:name,
			image:image,
			description:description,
			author:author
			};
	Campground.create(newcampground,function(err,newitem){
		if(err){
			console.log(err);
		}else{
			res.redirect("/campgrounds");
		}
	});
});
router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new");
});
//show more info about campground
router.get("/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundcampground){
		if(err){
			console.log(err);
		}
		else{ 
			res.render("campgrounds/show",{campground:foundcampground});
		}
	});
});

//Edit campground Route
router.get("/:id/edit",middleware.checkCampgroundOwnership ,function(req,res){
			
	Campground.findById(req.params.id,function(err,foundcampground){
	
			//campground.author.id - mongoose object
			//req.user._id - string
				res.render("campgrounds/edit",{campground:foundcampground});
	});
	
});
//Update campground Route
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
	//find and update the given campground

	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedcampground){
		if(err){
			res.redirect("/campgrounds");
		}		
		else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});

});
//Destroy campground Route
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/campgrounds");
		} else{
			res.redirect("/campgrounds");
		}
	});
});


module.exports = router;