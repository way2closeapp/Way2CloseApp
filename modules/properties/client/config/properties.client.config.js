(function() {
  'use strict';

  // Properties module config
  angular
    .module('properties')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Config logic
    // ...
  }
})();
