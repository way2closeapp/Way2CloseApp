// Tasks service used to communicate Tasks REST endpoints
(function () {
  'use strict';

  angular
    .module('tasks')
    .factory('TasksService', TasksService);

  TasksService.$inject = ['$resource'];

  function TasksService($resource) {
    return $resource('api/tasks/:taskId', {
      taskId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());

(function () {
  'use strict';

  angular
    .module('tasks')
    .factory('PTasksService', PTasksService);

  PTasksService.$inject = ['$resource'];

  function PTasksService($resource) {
    return $resource('api/tasks/property/:pId', {
		pId: '@_id'
	}, {
		//query: { method: 'GET', params: {pId: '@pId'}, isArray: true},
      update: { method: 'PUT'}
    });
  }
}());


/*
 function PTasksService($resource) {
    return $resource('api/tasks/property/:pId', {
      pId: '@_id'
    }, {
		query: { method: 'POST'},
      update: { method: 'PUT'}
    });
  }*/