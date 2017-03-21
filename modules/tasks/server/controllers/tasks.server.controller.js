'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Task = mongoose.model('Task'),
  User = mongoose.model('User'),
  Article = mongoose.model('Article'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Task
 */
exports.create = function(req, res) {
  var task = new Task(req.body);
  task.user = req.user;
  Article.findById(req.body.property).exec(function (err, article) {
    if (err) {
      console.log("23" + err);
    } else if (!article) {
      console.log("article not found");
    } else{
    var resp = req.body.responsibility;
	if(resp == "buyeragent") {task.resUID = article.buyeragent;}
	else if(resp == "selleragent") {task.resUID = article.selleragent;}
	else if (resp == "buyer") {task.resUID = article.buyer;}
	else {task.resUID = article.seller;}
	  task.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(task);
    }
  });}
  });
};

/**
 * Show the current Task
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var task = req.task ? req.task.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  task.isCurrentUserOwner = req.user && task.user && task.user._id.toString() === req.user._id.toString();

  res.jsonp(task);
};

/**
 * Update a Task
 */
exports.update = function(req, res) {
  var task = req.task;
	if(req.complete) {
		task.complete = true;
	}
  task = _.extend(task, req.body);

  task.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(task);
    }
  });
};

/**
 * Delete an Task
 */
exports.delete = function(req, res) {
  var task = req.task;

  task.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(task);
    }
  });
};

/**
 * List of Tasks
 */
exports.list = function(req, res) {
	console.log("eighty four");
	/*var propertyId = req.id;
	console.log(property);
	Task.find({property: propertyId}).exec(function(err, models) {
			if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(models);
		}
		});
	console.log("anything");*/
 Task.find().sort('-created').populate('user', 'displayName').exec(function(err, tasks) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(tasks);
    }
  });
};

exports.listPropertyy = function(req, res){
		console.log("eighty four");
		res.json(req.tasks);
	/*console.log(req.pId);
	console.log(pId);
	var id = req.pId;*/
	//console.log(req.tasks);
	/*Task.find({property: id}).exec(function(err, models) {
			if (err) {
				console.log("error in tasks.server.controller.js: line 113");
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			console.log(JSON.stringify(models));
			res.json(models);
			//next();
		}
		});*/
	console.log("one hundred and twenty");
};

exports.listProperty = function(req, res, next, id){
		console.log("eighty five");
	console.log(id);
	Task.find({property: id}).exec(function(err, models) {
			if (err) {
				console.log("error in tasks.server.controller.js: line 113");
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			console.log(JSON.stringify(models));
			req.tasks = models;
			res.tasks = models;
			//res.json(models);
			next();
			
		}
		});
	console.log("one hundred and twenty one");
};

/**
 * Task middleware
 */
exports.taskByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Task is invalid'
    });
  }

  Task.findById(id).populate('user', 'displayName').exec(function (err, task) {
    if (err) {
      return next(err);
    } else if (!task) {
      return res.status(404).send({
        message: 'No Task with that identifier has been found'
      });
    }
    req.task = task;
    next();
  });
};

exports.byUser = function(req, res) {
console.log("fetching tasks by UID..." + req.user._id);
Task.find({resUID: req.user._id}).exec(function (err, tasks) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
		console.log(tasks);
      res.json(tasks);
    }
  });
};



