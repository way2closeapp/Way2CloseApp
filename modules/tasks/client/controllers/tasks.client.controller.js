(function () {
  'use strict';

  // Tasks controller
  angular
    .module('tasks')
    .controller('TasksController', TasksController);

  TasksController.$inject = ['$scope', '$state', '$stateParams', '$window', 'Authentication', 'taskResolve'];

  function TasksController ($scope, $state, $stateParams, $window, Authentication, task) {
    var vm = this;

    vm.authentication = Authentication;
    vm.task = task;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
	vm.complete = complete;

    // Remove existing Task
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.task.$remove($state.go('articles.view'
		, {articleId: $stateParams.articleId}
		));
      }
    }

	// Mark Existing Task as Completed
	function complete() {
		vm.task.complete = true;
		vm.task.completed_on = new Date();
		vm.task.$update(successCallback, errorCallback);

      function successCallback(res) {
        $state.go('articles.view'
		, {articleId: $stateParams.articleId}
		);
      }

      function errorCallback(res) {
        vm.error = res.data.message;
		alert(vm.error);
		alert(JSON.stringify(data));
      }
	}
    // Save Task
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.taskForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.task._id) {
        vm.task.$update(successCallback, errorCallback);
      } else {
		vm.task.property = $stateParams.articleId;
        vm.task.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
		  //alert(res.property);
        $state.go('articles.view'
		, {articleId: res.property}
		);
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
