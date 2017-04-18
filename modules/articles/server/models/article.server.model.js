'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  validator = require('validator'),
  Schema = mongoose.Schema;
  //User = require('./User');

/**
 * A Validation function for local strategy email
 */
var validateLocalStrategyEmail = function (email) {
  return ((this.provider !== 'local' && !this.updated) || validator.isEmail(email));
};

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
  /*agent: {
    type: String,
    required: 'Please enter Agents Name',
    unique: false
  },
  firstName: {
    type: String,
    required: [true, 'Please enter a first name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please enter a last name'],
  },

  title: {
    type: String,
    enum: ['Mr.', 'Mrs.', 'Ms.', 'Dr.', ''],
  },
 
  phone: {
    type: String
  },*/
  user: {
    type: Schema.ObjectId,
    ref: 'User',
	unique: false
  },
   email: {						///just until MLAB signin
    type: String,
    lowercase: true,
    trim: true,
    default: Date.now,
	unique: false
  },
    clientID: {					//just until MLAB signin
    type: String,
    lowercase: true,
	default: Math.random(),
    trim: true,
	unique: false
  },
  created_at: {
    type: Date,
    default: Date.now,
	unique: false

  },
  created_by: {
    type: Schema.ObjectId,
    ref: 'User',
	unique: false
	
  },
  updated_at: {
    type: Date,
    default: Date.now,
	unique: false
  },
  updated_by: {
    type: Schema.ObjectId,
    ref: 'User',
	unique: false
  },
  street: {
    type: String,
    required: true,
	unique: false
  },
  city: {
    type: String,
    required: true,
	unique: false
  },
  state: {
    type: String,
    required: true,
	unique: false
  },
  zip: {
    type: Number,
    required: true,
	unique: false
  },
  mlsCode: {
    type: Number,
    required: true,
    unique: false
  },
  buyeragent: {
    type: Schema.ObjectId,
	ref: 'User',
	unique: false
  },
  selleragent: {
    type: Schema.ObjectId,
	ref: 'User',
	unique: false
  },
  buyer: {
    type: Schema.ObjectId,
	ref: 'User',
	unique: false
  },
  seller: {
    type: Schema.ObjectId,
	ref: 'User',
	unique: false
  },
 /* contract: [{
    active: Date,
    pastActive: Boolean,
    todoDate: Date
  }],
  escrow: [{
    active: Date,
    pastActive: Boolean,
    todoDate: Date
  }],
  inspection: [{
    active: Date,
    pastActive: Boolean,
    todoDate: Date
  }]*/
});

mongoose.model('Article', ArticleSchema);
