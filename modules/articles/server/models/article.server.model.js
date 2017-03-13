'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  validator = require('validator'),
  Schema = mongoose.Schema;

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
  agent: {
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
  clientID: {
    type: String,
    unique: 'Username already exists',
    required: 'Please fill in a username',
    lowercase: true,
    trim: true
  },
  title: {
    type: String,
    enum: ['Mr.', 'Mrs.', 'Ms.', 'Dr.', ''],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    default: '',
    validate: [validateLocalStrategyEmail, 'Please fill a valid email address']
  },
  phone: {
    type: String/*,
         validate :  {
         validator : function(v,cb){
         setTimeout(function()   {
         cb(/\d{3}-\d{3}\-d{4}/.test(v));
         }, 5);
         },
         message: 'Please enter as 000-000-0000'
         }*/
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
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
  seller: {
    type: String,
    required: false,
    default: ''
  },
  contract: [{
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
  }]
});

mongoose.model('Article', ArticleSchema);
