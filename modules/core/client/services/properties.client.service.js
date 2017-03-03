/*(function () {
  'use strict';

  angular
    .module('core')
    .factory('coreService', coreService);

  coreService.$inject = [/*Example: '$state', '$window' */];

  //function coreService(/*Example: $state, $window */) {
    // Properties service logic
    // ...

    // Public API
   /* return {
      someMethod: function () {
        return true;
      }
    };
  }
})();*/

'use strict';

//Categories service used to communicate Categories REST endpoints
angular.module('core').factory('coreService', ['$resource',
	function($resource) {
		return $resource('properties/:propertyId', { propertyId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);