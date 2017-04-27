'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Task Schema
 */
var TaskSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Task name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  property: {
	  type: Schema.ObjectId,
	  ref: 'Article'
  },
  responsibility: {
	  type: String,
	  required: true
  },
  resUID: {
	  type: Schema.ObjectId,
	  ref: 'User'
  },
  due: {
	  type: Date,
	  required: true
  },
  completed_on: {
	  type: Date
  },
  complete: {
	  type: Boolean,
	  default: true
  }
});

mongoose.model('Task', TaskSchema);
