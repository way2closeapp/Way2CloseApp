(function () {
  'use strict';

  angular
    .module('calendar')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
      Menus.addMenuItem('topbar', {
      title: 'Calendar',
      state: 'calendar.view',
      roles: ['user','admin']
    });


  }
}());
