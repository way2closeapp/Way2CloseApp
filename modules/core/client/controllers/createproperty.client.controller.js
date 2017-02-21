'use strict';

angular.module('core').controller('CreatepropertyController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
	 
  }
]);
