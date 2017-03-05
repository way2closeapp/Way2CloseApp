'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    // Home state routing
    $stateProvider
      .state('calendar', {
        url: '/calendar',
        templateUrl: 'modules/core/client/views/calendar.client.view.html',
        controller: 'CalendarController',
        controllerAs: 'vm'
      })
      .state('multidashboard', {
        url: '/',
        templateUrl: 'modules/core/client/views/multidashboard.client.view.html',
        controller: 'MultidashboardController',
        controllerAs: 'vm'
      })
      .state('singledashboard', {
        url: '/properties/:propertyId',
        templateUrl: 'modules/core/client/views/singledashboard.client.view.html',
        controller: 'CreatepropertyController',
        controllerAs: 'vm'
      })
      .state('createproperty', {
        url: '/createproperty',
        templateUrl: 'modules/core/client/views/createproperty.client.view.html',
        controller: 'CreatepropertyController',
        controllerAs: 'vm'
      })
    .state('home', {
      url: '/',
      templateUrl: 'modules/core/client/views/home.client.view.html'
    })
    .state('not-found', {
      url: '/not-found',
      templateUrl: 'modules/core/client/views/404.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('bad-request', {
      url: '/bad-request',
      templateUrl: 'modules/core/client/views/400.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('forbidden', {
      url: '/forbidden',
      templateUrl: 'modules/core/client/views/403.client.view.html',
      data: {
        ignoreState: true
      }
    });
  }
]);
