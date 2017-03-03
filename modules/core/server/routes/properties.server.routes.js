'use strict';

module.exports = function(app) {
  // Routing logic   
	var properties = require('../controllers/properties.server.controller');
	var users = require('../../../users/server/controllers/users/server.controller');
	
	app.route('/properties')
	  .get(properties.list);
	  .post(properties.create);
	  
	app.route('/properties/:propertyId')
		.get(properties.read);
		.put(properties.update);
		.delete(categories.delete);
	app.param('propertyId', properties.propertyByID);
};
