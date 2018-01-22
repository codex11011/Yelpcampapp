var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [	
		{
			name:"desert",
			image:"http://rs397.pbsrc.com/albums/pp54/nestor15_01/ABC%20Portfoil/Mountain.jpg?w=280&h=210&fit=crop",
			description:"wow"
		},
		{
			name:"The cold desert",
			image:"http://rs625.pbsrc.com/albums/tt334/banjodad/Mntns.jpg?w=280&h=210&fit=crop",
			description:"nice"
		},
		{
			name:"The Lake",
			image:"http://rs276.pbsrc.com/albums/kk20/rn1975/nature.jpg?w=280&h=210&fit=crop",
			description:"salt lake"
		}
	];


function seedDB(){

	Campground.remove({},function(err){
				if(err){
					console.log(err);
			}
			else{
					console.log("removed campgrounds");
					data.forEach(function(seed){
					Campground.create(seed,function(err,campground){
						if(err){
							console.log(err);
						}else{
							console.log("data added");
							Comment.create({
								text:"Balance in nature",
								author:"Dexter"
							},function(err,comment){
								if(err){
									console.log(err);
								}
								else{
								campground.comments.push(comment);
								campground.save();
								console.log("created");
							}
							});
						}
					});
			  	});
			}
});
}
	

module.exports = seedDB;