'use strict';

module.exports = function(app) {
  // Routing logic   
	var properties = require('../controllers/properties.server.controller');
	//var users = require('../../../users/server/controllers/users/server.controller');
	
	app.route('/properties')
	  .get(properties.list)
	  .post(properties.create);
	app.route('/dash').get(properties.list);
	app.route('/dash').post(properties.list);
	app.route('/properties/:propertyId')
		.get(properties.read)//.get(properties.read)
		.post(properties.propertyByID)
		.put(properties.update)
		.delete(properties.delete);
	app.param('propertyId', properties.propertyByID);
};
