'use strict';

/**
 * Module dependencies.
 */
 var path = require('path');
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Property = mongoose.model('Property'),
    _ = require('lodash');

	
/**
 * Create a Property
 */
exports.create = function(req, res) {
	var property = new Property(req.body);
console.log("creation");
	property.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.status(201).json(property);
		}
	});
};

/**
 * Show the current Property
 */
exports.read = function(req, res) {
	res.json(req.property);
};

/**
 * Update a Property
 */
exports.update = function(req, res) {
	var property = req.property;

	property = _.extend(property, req.body);

	property.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(property);
		}
	});
};

/**
 * Delete an Property
 */
exports.delete = function(req, res) {
	var property = req.property;

	property.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(property);
		}
	});
};

/**
 * List of properties
 */
exports.list = function(req, res) {

	var email = req.user.email;
	console.log(email);
	Property.find({$or: [{buyeragent: email}, {selleragent:email}, 
		{buyer: email}, {seller: email}]}).exec(function(err, models) {

			if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {

			res.json(models);
		}
		});
	console.log("anything");
	//ORIGINAL: returns all listings: May need this later for master view.
	/*Property.find().exec(function(err, models) {

		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(models);
		}

	});*/

};

/**
 * Property middleware
 */
exports.propertyByID = function(req, res, next, id) {
console.log("anythingelse");
console.log(id);
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Property is invalid'+id.body+req.body
		});
	}

	Property.findById(id).exec(function(err, property) {
		if (err) return next(err);
		if (!property) {
			return res.status(404).send({
  				message: 'Property not found'
  			});
		}
		req.property = property;
		res.json(property);
//		next();
	});
};