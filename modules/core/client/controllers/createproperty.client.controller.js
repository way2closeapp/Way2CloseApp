'use strict';

angular.module('core').controller('CreatepropertyController', ['$scope', 'Authentication', 'Properties',
  function ($scope, Authentication, Properties) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
	 $scope.createProperty = function() {
		 var buyeragent, selleragent, buyer, seller;
		 if($scope.agentrole == "Buyer") {
			 buyeragent += $scope.authentication.user.email;
			 selleragent += $scope.agentemail;
		 } else {
			 selleragent += $scope.authentication.user.email;
			 buyeragent += $scope.agentemail;
		 }
		 var property = new Property({
			 address: $scope.address,
			 mlsCode: $scope.MLS,
			 buyeragent: buyeragent,
			 selleragent: selleragent,
			 buyer: buyeremail,
			 seller: selleremail,
			 creator: $scope.authentication.user.email,
			 
		 });
		 // Redirect after save
			property.$save(function(response) {
				$location.path('properties/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

	};
  }
]);
