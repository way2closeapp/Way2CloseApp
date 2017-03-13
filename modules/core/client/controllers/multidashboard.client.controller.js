'use strict';

angular.module('core').controller('MultidashboardController', ['$scope', '$stateParams', '$http', 'Authentication', '$location', 'Properties',
  function ($scope, $stateParams, $http, Authentication, $location, Properties) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
		  	$scope.currentPage = 1;
	  	$scope.pageSize = 10;
$scope.offset = 0;
	$scope.find = function() {
		alert("finding");
		$http.post('/dash').
		success(function(data) {
			alert("great success");
			alert(data);
			$scope.properties = data;
			
		}).
		error(function(err) {
			alert(err);
		});
		//$scope.properties = Properties.query();
		//$scope.properties = Properties.list();
		//alert($scope.properties.tostring());
		//alert(JSON.stringify($scope.properties));
		
		//alert($scope.properties.length);
	};
	$scope.findOne = function() {
		//alert("multione");
		alert($stateParams.propertyId);
		$scope.property = Properties.get({ 
				propertyId: $stateParams.propertyId
});
		alert($scope.property);
		alert(JSON.stringify($scope.property));
		/*$http.get('/properties/'+$stateParams.propertyId).
	success(function(data, status, headers, config) {
        
		alert(data);

    }).
    error(function(data, status, headers, config) {
      $scope.error = 'Problem finding a user with that email';
	  alert(data);

    });*/
	};
  }
]);
