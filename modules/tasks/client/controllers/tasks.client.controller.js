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

    // Remove existing Task
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.task.$remove($state.go('singledashboard'
		, {propertyId: $stateParams.propertyId}
		));
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
		vm.task.property = $stateParams.propertyId;
        vm.task.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
		  //alert(res.property);
        $state.go('singledashboard'
		, {propertyId: res.property}
		);
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
