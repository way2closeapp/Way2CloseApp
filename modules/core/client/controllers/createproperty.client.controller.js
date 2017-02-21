'use strict';

angular.module('core').controller('CreatepropertyController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
	/* $scope.createProperty = function() {
// Simple POST request example (passing data) :
$http.post('/newproperty', {name: contact_name, msg: contact_msg}).
  success(function(data, status, headers, config) {
    // this callback will be called asynchronously
    // when the response is available
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
};*/
  }
]);
