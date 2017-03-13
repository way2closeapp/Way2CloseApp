'use strict';

angular.module('core').controller('MultidashboardController', ['$scope', '$stateParams', '$http', 'Authentication', '$location', 'Properties',
  function ($scope, $stateParams, $http, Authentication, $location, Properties) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
		  	$scope.currentPage = 1;
	  	$scope.pageSize = 10;
$scope.offset = 0;
		
	$scope.find = function() {
		var data = {
                user: $scope.authentication.user.email
            };
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
		//alert("email sent: "+$scope.authentication.user.email+data.user)
		$http.post('/dash', data, config).
		success(function(data) {
			$scope.properties = data;
			//alert(data);
			//alert(data.length);
		}).
		error(function(err) {
			$location.path('/authentication/signin');
			//alert(err);
		});
		//$scope.properties = Properties.query();
		//$scope.properties = Properties.list();
	};
	
  }
]);
