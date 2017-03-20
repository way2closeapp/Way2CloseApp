(function () {
  'use strict';

  angular
    .module('tasks')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Tasks',
      state: 'tasks',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'tasks', {
      title: 'List Tasks',
      state: 'tasks.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'tasks', {
      title: 'Create Task',
      state: 'tasks.create',
      roles: ['user']
    });
  }
}());
