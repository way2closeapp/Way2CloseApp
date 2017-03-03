'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	property = mongoose.model('Property'),
    _ = require('lodash');

/**
 * Create a property
 */
exports.create = function(req, res) {
	var property = new property(req.body);

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
 * Show the current property
 */
exports.read = function(req, res) {
	res.json(req.property);
};

/**
 * Update a property
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
 * Delete an property
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
	property.find().sort('name').exec(function(err, properties) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(properties);
		}
	});
};

/**
 * property middleware
 */
exports.propertyByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'property is invalid'
		});
	}

	property.findById(id).exec(function(err, property) {
		if (err) return next(err);
		if (!property) {
			return res.status(404).send({
  				message: 'property not found'
  			});
		}
		req.property = property;
		next();
	});
};