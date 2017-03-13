'use strict';

angular.module('core').controller('CreatepropertyController', ['$scope', '$http', '$stateParams', 'Authentication', '$location', 'Properties', 'PTasksService',
  function ($scope, $http, $stateParams, Authentication, $location, Properties, PTasksService) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
	 $scope.create = function() {
		 var buyeragent;
		 var selleragent;
		 if($scope.agentrole == "Buyer") {
			 buyeragent = $scope.authentication.user.email;
			 selleragent = $scope.agentemail;
		 } else {
			 selleragent = $scope.authentication.user.email;
			 buyeragent = $scope.agentemail;
		 }
		 
		 var property = new Properties({
			 address: $scope.address,
			 mlsCode: $scope.MLS,
			 buyeragent: buyeragent,
			 selleragent: selleragent,
			 buyer: $scope.buyeremail,
			 seller: $scope.selleremail,
			 creator: $scope.authentication.user.email,
		 });
		 
		 // Redirect after save
			property.$save(function(response) {
				var id = response._id;
				$location.path('/properties/'+id);
				// Clear form fields
				$scope.name = '';
			}, function(err) {
				alert("there has been an error!");
				alert(err.data);
				alert(err.message);
			});

	};
	
		$scope.findOne = function() {

		/*$scope.property = Properties.get({ 
				propertyId: $stateParams.propertyId
});*/
		var data = {
                id: $stateParams.propertyId
            };
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
		$http.post('/properties/'+$stateParams.propertyId, data, config).
	success(function(data, status, headers, config) {
		alert(JSON.stringify(data));
		var e = $scope.authentication.user.email;
		$scope.role = e==data.buyeragent? 0 : e==data.selleragent? 1 : e==data.buyer? 2 : e==data.seller? 3 : 4;
		alert($scope.role);
		$scope.property = data;
		
    }).
    error(function(data, status, headers, config) {
		alert("error: " + JSON.stringify(data));
      $scope.error = 'Problem finding a user with that email';
    });

	$http.post('api/tasks/property/'+data.id, data, config).
	success(function(data, status, headers, config) {
		//alert(JSON.stringify(data));
		//$scope.tasks = data;
		$scope.BATasks = []; $scope.SATasks = []; $scope.BTasks = []; $scope.STasks = [];
		$scope.roles = ["Buyer Agent", "Seller Agent", "Buyer", "Seller"];
		for(var i=0; i<data.length; i++) {
			var r = data[i].responsibility;
			if(r == "buyeragent") {$scope.BATasks.push(data[i]);}
			else if (r == "selleragent") {$scope.SATasks.push(data[i]);}
			else if (r == "buyer") {$scope.BTasks.push(data[i]);}
			else if (r == "seller") {$scope.STasks.push(data[i]);}
		}
		$scope.tasks = [$scope.BATasks, $scope.SATasks, $scope.BTasks, $scope.STasks];
		alert(JSON.stringify($scope.tasks[0]));
    }).
    error(function(data, status, headers, config) {
		alert("error")
		alert(JSON.stringify(data));
    });

	};
  }
]);
