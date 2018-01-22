var express 	= require("express");
var app 		= express();
var mongoose 	= require("mongoose");
var flash       = require("connect-flash");
var passport 	= require("passport");
var LocalStrategy 		  = require("passport-local");
var methodOverride        = require("method-override");
var passportLocalMongoose = require("passport-local-mongoose");
var path 				  = require("path");
var bodyParser 			  = require("body-parser");
var Campground 			  = require("./models/campground");
var Comment 			  = require("./models/comment");
var User 				  = require("./models/user");
var seedDB 				  = require("./seeds");

var commentRoutes 	 = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes 	 = require("./routes/index")

var assert = require("assert");
var Databaseurl="mongodb://localhost";//set database-url to database, in this case local host
mongoose.connect("Databaseurl");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();//seed the database

//passport configuration
app.use(require("express-session")({
	secret:"hello",
	resave:false,
	saveUninitialized:false 
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//middleware run for every single route
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});//added this to every template and every route
//will have currentuser available equal to currently logged-in user

app.use("/",indexRoutes);
//appending /campgrounds in all routes in campgrounds.js
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


app.listen(3000,function(){
	console.log("Yelpcamp server has started!!!");
});
