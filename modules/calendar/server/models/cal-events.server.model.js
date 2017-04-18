'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * CalEvent Schema
 */
var CalEventSchema = new Schema({
  created: { //Date task.created
    type: Date,
    default: Date.now
  },
  title: { //String task.name
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  url: { //unused
    type: String,
    default: '',
    trim: true
  },
  type: { //Boolean task.complete
    type: String,
    default: '',
    trim: true
  },
  allDay: Boolean, //unused
  start: Date, //Date task.due
  end: Date, //unused
  stick: { type: Boolean, default: true },
  user: { //Schema.ObjectId task.user
    type: Schema.ObjectId,
    ref: 'User'
  },
  className: [String] //unused
});

mongoose.model('CalEvent', CalEventSchema);
