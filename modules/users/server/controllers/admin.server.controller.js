'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Show the current user
 */
exports.read = function (req, res) {
  res.json(req.model);
};

/**
 * Update a User
 */
exports.update = function (req, res) {
  var user = req.model;

  //For security purposes only merge these parameters
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.displayName = user.firstName + ' ' + user.lastName;
  user.roles = req.body.roles;

  user.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(user);
  });
};

/**
 * Delete a user
 */
exports.delete = function (req, res) {
  var user = req.model;

  user.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(user);
  });
};

/**
 * List of Users
 */
exports.list = function (req, res) {
//	console.log(req.query.email);
	if(req.query.email) {
		console.log(req.query.email);
User.findOne({
    email: req.query.email
}).exec(function(err, user) {
	console.log(user);
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    //if (!user) return next(new Error('Failed to load User ' + username));
	//add functionality to create new user and send them an email to get set up.
    res.json(user);
});
	}
else if(req.query.userId) {
	console.log("query by ID");
	User.findById(req.query.userId, '-salt -password').exec(function (err, user) {
    if (err) {
      res.json(err);
    } else if (!user) {
      //userDNE
    }
res.json(user);
  });
} else {
	console.log(req.query);
	console.log("normal find users");
  User.find({}, '-salt -password').sort('-created').populate('user', 'displayName').exec(function (err, users) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(users);
});}
};

/**
 * User middleware
 */
exports.userByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'User is invalid'
    });
  }

  User.findById(id, '-salt -password').exec(function (err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return next(new Error('Failed to load user ' + id));
    }

    req.model = user;
    next();
  });
};


// /*
// * user middleware for userId from Email
// * */
// exports.userByEmail = function(req, res, next, email) {
// 	console.log("UserByEmail hit!!!!");
// User.findOne({
//     email: email
// }, '_id').exec(function(err, user) {
// 	console.log(user);
//     if (err) return next(err);
//     if (!user) return next(new Error('Failed to load User ' + username));
// 	//add functionality to create new user and send them an email to get set up.
//     req.user = user;
//     next();
// });
// };
