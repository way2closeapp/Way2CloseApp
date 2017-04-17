'use strict';
var propertyApp = angular.module('articles');
// Articles controller
propertyApp.controller('ArticlesController', ['$scope', '$stateParams', 'Users', 'Authentication', 'Articles',
  function ($scope, $stateParams, Users, Authentication, Articles) {
    this.authentication = Authentication;
      // Find a list of Articles

    this.articles = Articles.query().$promise.then(function(res) {
		$scope.articles = res;
		console.log(res);
		for(var i=0; i<$scope.articles.length; i++) {

		$scope.articles[i].buyer = Users.get({userId:$scope.articles[i].buyer});
		$scope.articles[i].seller = Users.get({userId:$scope.articles[i].seller});
		$scope.articles[i].selleragent = Users.get({userId:$scope.articles[i].selleragent});
		$scope.articles[i].buyeragent = Users.get({userId:$scope.articles[i].buyeragent});
	//	console.log($scope.articles[i].buyer,$scope.articles[i].buyeragent)
	}
	});
	
  }]);
propertyApp.controller('ArticlesCreateController', ['$scope','$location', 'Users', 'Authentication', 'Articles',
  function ($scope, $location, Users, Authentication, Articles) {
    $scope.authentication = Authentication;
        // Create new Article
    $scope.create = function (isValid) {
      $scope.error = null;
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');
        return false;
      }
	 /* var buyer = Users.get({email:this.buyer})._id;
	  var seller = Users.get({email:this.seller})._id;
	  var agent = Users.get({email:this.agentEmail})._id;*/
	  	
	var buyeragent;
		var selleragent;
		 if($scope.agentrole == "Buyer") {
			 buyeragent = $scope.authentication.user.email;
			selleragent = this.agentEmail;
		 } else {
			 selleragent = $scope.authentication.user.email;
			buyeragent = this.agentEmail;
		 } 
		 //var rand = Math.random();
// Create new Article object
      var article = new Articles({
		
        
        street: this.street,
        city: this.city,
        state: this.state,
        zip: this.zip,
        mlsCode: this.mlsCode,
		buyeragent: buyeragent,
		selleragent: selleragent,
		buyer: this.buyer,
		seller: this.seller
		//clientID: rand
		
      });

            // Redirect after save
      article.$save(function (response) {
        $location.path('articles/' + response._id);

                // Clear form fields
        $scope.agent='',
                    $scope.street='',
                    $scope.city='',
                    $scope.state='',
                    $scope.zip='',
                    $scope.mlsCode='',
                    $scope.seller=''

      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });	
            
    };

  }]);
propertyApp.controller('ArticlesEditController', ['$scope', '$stateParams', '$location' , 'Articles', 'Authentication',
  function ($scope, $stateParams,  $location, Articles , Authentication) {
      $scope.article = Articles.get({
        articleId: $stateParams.articleId
      });
        // Update existing Article*/
    $scope.update = function (isValid) {
		alert(90);
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');

        return false;
      }
	
      var article = $scope.article;

      article.$update(function () {
        $location.path('articles/' + article._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

  }]);

propertyApp.controller('ArticlesFindOneController', ['$scope', '$state', '$stateParams', '$location', 'Authentication', 'Articles', '$http', 'PTasksService',
  function ($scope, $state, $location, $stateParams, Authentication, Articles, $http, PTasksService) {
    $scope.authentication = Authentication;
        // Find existing Article
    $scope.findOne = function () {
		$stateParams.articleId = $stateParams.$$path.substring(10, $stateParams.$$path.length);
      $scope.article = Articles.get({
        articleId: $stateParams.articleId
      });
	  $scope.article.$promise.then(function(result) {
		 $scope.article = result;
		 var id = $scope.authentication.user._id;
		 if(id == $scope.article.buyeragent) {$scope.role = 0;}
			else if (id == $scope.article.selleragent) {$scope.role = 1;}
			else if (id == $scope.article.buyer) {$scope.role = 2;}
			else if (id == $scope.article.seller) {$scope.role = 3;}
		$scope.roles = ["Buyer's Agent", "Seller's Agent", "Buyer", "Seller"];
		$scope.roleName = $scope.roles.splice($scope.role, 1)[0];
			  $scope.getTasks();
	  });

    };
        // Remove existing Article
    $scope.remove = function () {
        $scope.article.$remove(function () {
         $state.go('articles.list');
        });
    };
        // Update existing Article
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');

        return false;
      }

      var article = $scope.article;

      article.$update(function () {
        $location.path('articles/' + article._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
	
		$scope.getTasks = function() {
			$scope.data = {
                id: $stateParams.articleId
            };
            $scope.config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };
	$http.post('api/tasks/property/'+$scope.data.id, $scope.data, $scope.config).
	success(function(data, status, headers, config) {
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
		$scope.mytasks = $scope.tasks;
    }).
    error(function(data, status, headers, config) {
		alert("error")
		alert(JSON.stringify(data));
    });
	};
	$scope.complete = function(task) {

		task.complete = true;
		task.completed_on = new Date();
		$http.put('/api/tasks/'+task._id, {task: task, complete: true}, $scope.config).
		success(function(data, status, headers, config) {
		//alert(JSON.stringify(data));
    }).
    error(function(data, status, headers, config) {
		alert("error");
		
    });
	};

  }]);












