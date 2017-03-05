'use strict';

angular.module('core').controller('CreatepropertyController', ['$scope', '$http', '$stateParams', 'Authentication', '$location', 'Properties',
  function ($scope, $http, $stateParams, Authentication, $location, Properties) {
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
				alert(response);
				$location.path('/');

				// Clear form fields
				$scope.name = '';
			}, function(err) {
				alert("there has been an error!");
				alert(err.data);
				alert(err.message);
			});

	};
	
		$scope.findOne = function() {
		alert("multione");
		alert($stateParams.propertyId);
		/*$scope.property = Properties.get({ 
				propertyId: $stateParams.propertyId
});
		alert($scope.property);
		alert($scope.property.id);
		alert($scope.property._id);
		alert($scope.property.length);
		alert(JSON.stringify($scope.property));*/
		var data = {
                id: $stateParams.propertyId
            };
       // alert(57);
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
			//alert(63);
		$http.post('/properties/'+$stateParams.propertyId, data, config).
	success(function(data, status, headers, config) {
        
		//alert(data);
	//alert(JSON.stringify(data));
	$scope.property = data;
alert($scope.property.address);
    }).
    error(function(data, status, headers, config) {
      $scope.error = 'Problem finding a user with that email';
	  //alert(data);
//alert(JSON.stringify(data));

    });
	};
  }
]);
