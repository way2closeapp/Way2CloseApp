'use strict';

angular.module('core').controller('CreatepropertyController', ['$scope', '$state', '$http', '$stateParams', 'Authentication', '$location', 'Properties', 'PTasksService', 
  function ($scope, $state, $http, $stateParams, Authentication, $location, Properties, PTasksService) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
	 var vm = this;
	vm.complete = complete;
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
	
	$scope.findAll = function() {
		var data = {
                user: $scope.authentication.user.email
            };
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };
		$http.post('/dash', data, config).
		success(function(data) {
			$scope.properties = data;
			$scope.getPercentages();
			
		}).
		error(function(err) {
			$location.path('/authentication/signin');
		});
	};
	
	$scope.getPercentages = function() {
		console.log(63);
            $scope.config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };
			console.log($scope.properties.length);
		for(var i=0; i < $scope.properties.length; i++) {
			console.log(70);
			$scope.data = {
                id: $scope.properties[i]._id
            }

				//alert(75);
				$scope.properties[i].percentages = ['', '', '', ''];
							//alert(JSON.stringify($scope.properties[i]));
		var brakes = 0;
$http.post('api/tasks/property/'+$scope.data.id, $scope.data, $scope.config).
	success(function(data, status, headers, config) {
		//alert(JSON.stringify(data));
		//if(){ //brakes++;
		$scope.tasks = [];
		$scope.BATasks = []; $scope.SATasks = []; $scope.BTasks = []; $scope.STasks = [];
		$scope.roles = ["Buyer Agent", "Seller Agent", "Buyer", "Seller"];
		for(var k=0; k<data.length; k++) {
			var r = data[k].responsibility;
			if(r == "buyeragent") {$scope.BATasks.push(data[k]);}
			else if (r == "selleragent") {$scope.SATasks.push(data[k]);}
			else if (r == "buyer") {$scope.BTasks.push(data[k]);}
			else if (r == "seller") {$scope.STasks.push(data[k]);}
		}
		$scope.tasks = [$scope.BATasks, $scope.SATasks, $scope.BTasks, $scope.STasks];
		for(var j = 0; j<4; j++) {
			var sum = 0;
			for(var k = 0; k<$scope.tasks[j].length; k++) {
				//console.log($scope.tasks[j][k].complete);
						if($scope.tasks[j][k].complete) {
							//console.log("completed");
							sum++;}
			}
			console.log(i);
			if(sum==0) { $scope.properties[i].percentages[j] = '2%';}
			//else if ($scope.tasks[j].length == 0) { $scope.properties[i].percentages[j] = '100%'; }
			else { $scope.properties[i].percentages[j] =  ((sum*100)/$scope.tasks[j].length) + "%"; }
		}
			console.log(JSON.stringify($scope.properties[i].percentages));
	//} else {console.log("brakes applied");}
    }).
    error(function(data, status, headers, config) {
		alert("error")
		alert(JSON.stringify(data));
    });
				
				
		}
	};

	
	
	
		$scope.findOne = function() {

		/*$scope.property = Properties.get({ 
				propertyId: $stateParams.propertyId
});*/
		$scope.data = {
                id: $stateParams.propertyId
            };
            $scope.config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };
		$http.post('/properties/'+$stateParams.propertyId, $scope.data, $scope.config).
	success(function(data, status, headers, config) {
		//alert(JSON.stringify(data));
		var e = $scope.authentication.user.email;
		$scope.role = e==data.buyeragent? 0 : e==data.selleragent? 1 : e==data.buyer? 2 : e==data.seller? 3 : 4;
		//alert($scope.role);
		$scope.roles = ["Buyer Agent", "Seller Agent", "Buyer", "Seller"];
		$scope.roleName = $scope.roles.splice($scope.role, 1);
		$scope.property = data;
		$scope.getTasks();
				
    }).
    error(function(data, status, headers, config) {
		alert("error: " + JSON.stringify(data));
      $scope.error = 'Problem finding a user with that email';
    });
	};
	
	$scope.getTasks = function() {
	$http.post('api/tasks/property/'+$scope.data.id, $scope.data, $scope.config).
	success(function(data, status, headers, config) {
		//alert(JSON.stringify(data));
		//$scope.tasks = data;
		$scope.BATasks = []; $scope.SATasks = []; $scope.BTasks = []; $scope.STasks = [];
		
		for(var i=0; i<data.length; i++) {
			var r = data[i].responsibility;
			if(r == "buyeragent") {$scope.BATasks.push(data[i]);}
			else if (r == "selleragent") {$scope.SATasks.push(data[i]);}
			else if (r == "buyer") {$scope.BTasks.push(data[i]);}
			else if (r == "seller") {$scope.STasks.push(data[i]);}
		}
		$scope.tasks = [$scope.BATasks, $scope.SATasks, $scope.BTasks, $scope.STasks];
		$scope.mytasks = $scope.tasks.splice($scope.role, 1);
    }).
    error(function(data, status, headers, config) {
		alert("error")
		alert(JSON.stringify(data));
    });
	};
	
	
	function complete(task) {

		//alert(JSON.stringify(task));
		task.complete = true;
		task.completed_on = new Date();
		var data = {task: task};
		$http.put('/api/tasks/'+task._id, task, $scope.config).
		success(function(data, status, headers, config) {

    }).
    error(function(data, status, headers, config) {
		alert("error");
		
    });

	}
  }
]);



