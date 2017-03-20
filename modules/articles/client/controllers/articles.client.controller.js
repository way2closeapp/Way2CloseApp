'use strict';
var propertyApp = angular.module('articles');
// Articles controller
propertyApp.controller('ArticlesController',  ['$scope', '$stateParams', 'Authentication', 'Articles' ,'$modal', '$log',
    function ($scope, $stateParams, Authentication, Articles, $modal, $log)  {
    this.authentication = Authentication;
      // Find a list of Articles

    this.articles = Articles.query();
        // Find existing Article
        $scope.findOne = function () {
            $scope.article = Articles.query({
                articleId: $stateParams.articleId
            });
        };
             // Remove existing Article
         $scope.remove = function (article) {
           if (article) {
             article.$remove();

             for (var i in $scope.articles) {
               if ($scope.articles[i] === article) {
                $scope.articles.splice(i, 1);
               }
             }
           } else {
             $scope.article.$remove(function () {
               $location.path('articles');
             });
           }
         };
      this.modalCreate = function (size) {

          var modalInstance = $modal.open({
              templateUrl: 'modules/articles/client/views/view-article.client.view.html',
              controller: function ($scope, $modalInstance) {


                  $scope.ok = function (isValid) {
                      console.log(isValid);
                      $modalInstance.close();
                  };

                  $scope.cancel = function () {
                      $modalInstance.dismiss('cancel');
                  };
              },
              size: size
          });

          modalInstance.result.then(function (selectedItem) {
          }, function () {
              $log.info('Modal dismissed at: ' + new Date());
          });
      };

  }]);
propertyApp.controller('ArticlesCreateController', ['$scope','$location' ,'Authentication', 'Articles',
  function ($scope, $location, Authentication, Articles) {
    $scope.authentication = Authentication;
        // Create new Article
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');

        return false;
      }
            // Create new Article object
      var article = new Articles({

        agent: this.agent,
        firstName: this.buyerFirst,
        lastName: this.buyerLast,
        clientID: this.clientID,
        email: this.email,
        street: this.street,
        city: this.city,
        state: this.state,
        zip: this.zip,
        mlsCode: this.mlsCode,
        seller: this.seller,
        tasks: this.tasks,
        active: this.active

      });

            // Redirect after save
      article.$save(function (response) {
        $location.path('articles/' + response._id);

                // Clear form fields
        // $scope.agent='',
        //             $scope.firstName='',
        //             $scope.lastName='',
        //             $scope.clientID='',
        //             $scope.email='',
        //             $scope.street='',
        //             $scope.city='',
        //             $scope.state='',
        //             $scope.zip='',
        //             $scope.mlsCode='',
        //             $scope.seller=''

      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

  }]);
propertyApp.controller('ArticlesEditController', ['$scope', '$location' , 'Articles', 'Authentication',
  function ($scope, $location, Articles , Authentication) {
    $scope.authentication = Authentication;
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

  }]);

propertyApp.controller('ArticlesFindOneController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
  function ($scope, $location, $stateParams, Authentication, Articles) {
    $scope.authentication = Authentication;

        // Find existing Article
    $scope.findOne = function () {
      $scope.article = Articles.get({
        articleId: $stateParams.articleId
      });
    };
      this.modalCreate = function (size) {

          var modalInstance = $modal.open({
              templateUrl: 'modules/articles/client/views/edit-article.client.view.html',
              controller: function ($scope, $modalInstance) {


                  $scope.ok = function (isValid) {
                      console.log(isValid);
                      $modalInstance.close();
                  };

                  $scope.cancel = function () {
                      $modalInstance.dismiss('cancel');
                  };
              },
              size: size
          });

          modalInstance.result.then(function (selectedItem) {
          }, function () {
              $log.info('Modal dismissed at: ' + new Date());
          });
      };
    //     // Remove existing Article
    // $scope.remove = function (article) {
    //   if (article) {
    //     article.$remove();
    //
    //     for (var i in $scope.articles) {
    //       if ($scope.articles[i] === article) {
    //         $scope.articles.splice(i, 1);
    //       }
    //     }
    //   } else {
    //     $scope.article.$remove(function () {
    //       $location.path('articles');
    //     });
    //   }
    // };
    //     // Update existing Article
    // $scope.update = function (isValid) {
    //   $scope.error = null;
    //
    //   if (!isValid) {
    //     $scope.$broadcast('show-errors-check-validity', 'articleForm');
    //
    //     return false;
    //   }
    //
    //   var article = $scope.article;
    //
    //   article.$update(function () {
    //     $location.path('articles/' + article._id);
    //   }, function (errorResponse) {
    //     $scope.error = errorResponse.data.message;
    //   });
    // };
  }]);












