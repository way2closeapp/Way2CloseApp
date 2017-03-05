

'use strict';

//Categories service used to communicate Categories REST endpoints
angular.module('core').factory('Properties', ['$resource',
	function($resource) {
		return $resource('properties/:propertyId', { propertyId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);