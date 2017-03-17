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
    ref: 'User'
  },
   email: {						///just until MLAB signin
    type: String,
    lowercase: true,
    trim: true,
    default: Date.now,
  },
    clientID: {					//just until MLAB signin
    type: String,
    lowercase: true,
	default: Date.now,
    trim: true
  },
  created_at: {
    type: Date,
    default: Date.now

  },
  created_by: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  updated_by: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: Number,
    required: true,
  },
  mlsCode: {
    type: Number,
    required: true,
    unique: true
  },
  /*buyeragent: [User],
  selleragent: [User],
  buyer: [User],
  seller: [User]*/
  buyeragent: {
    type: Schema.ObjectId,
	ref: 'User'
  },
  selleragent: {
    type: Schema.ObjectId,
	ref: 'User'
  },
  buyer: {
    type: Schema.ObjectId,
	ref: 'User'
  },
  seller: {
    type: Schema.ObjectId,
	ref: 'User'
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
