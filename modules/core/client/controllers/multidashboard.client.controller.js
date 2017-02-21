'use strict';

angular.module('core').controller('MultidashboardController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
	
  }
]);
