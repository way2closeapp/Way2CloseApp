'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**exfdkladjsf;idsj
 * Property Schema
 */
var PropertySchema = new Schema({
  // Property model fields
  //_id: {type: String}, //property UID
  address: {
	  type: String,
	  default: '',
	  required: true
  },
  mlsCode: {
	  type: String,
	  required: true
  },
  buyeragent: {
	  type: String, 		//_id of buyer's agent
	  required: true
  },
  selleragent: {
	  type: String,			//_id of seller's agent
	  required: true
  },
  buyer: {
	  type: String,			//_id of buyer
	  required: true
  },
  seller: {
	  type: String,			//_id of seller
	  required: true
  },
  created_at: {
	  type: Date,
	  default: Date.now
  },
  updated_at: {
	  type: Date,
	  default: Date.now
  },
  creator: {
	  type: String,			//_id of creator
	  required: true
  },
  updater: {
	  type: String			//_id of most recent updater
  }
  
}, {collection: 'properties'});

mongoose.model('Property', PropertySchema);
