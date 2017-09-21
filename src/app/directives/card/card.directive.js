(function () {
  'use strict';
  angular.module('app.directives').directive('card', function () {
    return {
      scope: {},
      restrict: 'EA',
      bindToController: {
        data: '<',
        listView: '='
      },
      controller: function () {
      },
      controllerAs: 'vm',
      templateUrl: 'directives/card/card.view.html'
    };
  });
})();
