'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
  
  var _ = require('lodash'),
  fs = require('fs'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  User = mongoose.model('User'),
  nodemailer = require("nodemailer"),
  transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
		  user: "way2closeapp@gmail.com",
		  pass: "Way2Cl0$eApp"
	  }
  });
/**
 * Create a article
 */
 

 
exports.create = function (req, res) {
	var finished = _.after(4, finished);
	var counter = 0;
	exports.userByEmail = function(email) {
	 User.findOne({
    email: email
}).exec(function(err, usr) {
    if (!usr || err) {
		//create blank user and send them an email.
		var role = counter<=1 ? ['user'] : ['admin', 'user'];
		var pw = "aA@" + Date.now();
		usr = new User({
			firstName: 'First Name',
			lastName: 'Last Name',
			email: email,
			username: email,
			password: pw,
			provider: 'local',
			roles: role
		});
		usr.username = " "+ email + " ";
		usr.save(function (err) {
    if (err) {
      console.log("47" + err);
    } else {
		console.log(usr.email + "user created.");
		var passage = "<!DOCTYPE html><html lang='en-US'><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8' /></head>" +
			"<body><h3>Hello!</h3>" +
			"<p>An account has been created for you at Way2Close. You have been added"+
			" to the property at " + req.body.street + ". </p>" +
			"<p>Please sign in at way2close.herokuapp.com/settings/profile" +
			" using this email and " + pw + " as your password, then edit your profile to reflect your information." +
			"<h3>Regards,</h3><h4>The Way2Close Team</h4></body>" +
			"<footer>Please do not reply to this email.</footer>" + 
			"</html>";
		transporter.sendMail({
			from: "way2closeapp@gmail.com",
			to: email,
			subject: 'New Account at Way2Close',
			html: passage
		}, (err, info) => {
			if(err) {console.log("62 email " + err);}
			else {console.log("message sent successfully to: " + email);}
		});
    }
	});
	} //else{//return next(new Error('Failed to load User ' + username));
	//add functionality to create new user and send them an email to get set up.
	console.log("user id:");
	console.log(usr._id);
	switch(counter) {
		case 0:req.body.buyer = usr; break;
		case 1: req.body.seller = usr; break;
		case 2: req.body.buyeragent = usr; break;
		case 3: req.body.selleragent = usr; break;		
	}
	counter++;
	finished();
    return usr;//}
});
};
	req.body.buyer = exports.userByEmail(req.body.buyer);
	req.body.seller = exports.userByEmail(req.body.seller);
	req.body.buyeragent = exports.userByEmail(req.body.buyeragent);
	req.body.selleragent = exports.userByEmail(req.body.selleragent);
	//var trash = exports.userByEmail(req.body.selleragent);
	function finished() {
		console.log("81, FINISHED");
  var article = new Article(req.body);
  article.user = req.user;
	article.buyer = req.body.buyer;
  article.save(function (err) {
    if (err) {
		console.log("86"+err);
      res.json(err);
    } else {
		console.log(article.mlsCode + " property created.");
      res.json(article);
    }
	});}
	
};





/**
 * Show the current article
 */
exports.read = function (req, res) {
  res.json(req.article);
};

/**
 * Update a article
 */
exports.update = function (req, res) {
  var article = req.article;
console.log(article);
  article.title = req.body.title;
  article.content = req.body.content;

  article.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  var article = req.article;

  article.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};

/**
 * List of Articles
 */
exports.list = function (req, res) {
  Article.find().sort('-created').populate('user', 'displayName').exec(function (err, articles) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(articles);
    }
  });
};

/**
 * Article middleware
 */
exports.articleByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Article is invalid'
    });
  }

  Article.findById(id).populate('user', 'displayName').exec(function (err, article) {
    if (err) {
      return next(err);
    } else if (!article) {
      return res.status(404).send({
        message: 'No article with that identifier has been found'
      });
    }
    req.article = article;
    next();
  });
};
