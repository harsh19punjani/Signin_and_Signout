var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
//var ObjectId = require('mongodb').ObjectID;



//insert api
router.post('/addtask', function(req, res, next) {
  
 var message=''; 
 var flage=false;
  MongoClient.connect("mongodb://localhost:27017/Login-SignUp",  function (err, db) {
    if(err) throw err;
	
	db.collection('Register', function (err, collection) {
       collection.find( {email:req.body.email}).toArray(function(err,result){
		 
		   if(err)
		   {
			    message="Some Error..please try again";
				flage=false;
		   }
		   console.log(result.length);
		   if(result.length !=0){
			  message="Email-id is already present";
			  flage=false;
		   }
		   else{
			   collection.insert({ name: req.body.name, email: req.body.email,password:req.body.password,dob:req.body.dob,phone:req.body.phone});
			   message="You've successfully signed up ";
			   flage=true;
		   }
		   res.send({status: message,flage:flage});
	   });
	  
     });
	
  });
  
});




//login api
router.post('/login', function(req, res, next) {
 var message=''; 
 var flage=false;
  MongoClient.connect("mongodb://localhost:27017/Login-SignUp",  function (err, db) {
    if(err) throw err;
	
	db.collection('Register', function (err, collection) {
       collection.find( { $and:[{email:req.body.email},{password:req.body.password}] }).toArray(function(err,result){
		 
		   if(err)
		   {
			    message="Some Error..please try again";
				flage=false;
		   }
		   
		   if(result.length !=0){
			  
			  message="Successfully Login";
			  flage=true;
		   }
		   else{
			    flage=false;
			    message="Email and Password does not match";
			   
		   }
		  res.send({status: message,flage:flage});
	   });
	  
     });
	
  });
  
});






module.exports = router;
