
'use strict';

angular.module('core').controller('SingledashboardController', ['$scope', '$stateParams', '$http', '$location', 'Authentication', 'Properties',
  function ($scope, $stateParams, $http, $location, Authentication, Properties) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    // Singledashboard controller logic
    // ...
	alert($location.path());
	$http.post($location.path()).
	success(function(data/*, status, headers, config*/) {
        // do something useful with data
		alert(data);
    }).
    error(function(data, status, headers, config) {
      $scope.error = 'Problem finding a user with that email';
	  alert(data);
    });
  }
]);

