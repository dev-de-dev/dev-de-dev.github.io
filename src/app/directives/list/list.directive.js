(function () {
  'use strict';
  angular.module('app.directives').directive('listed', function () {
    return {
      scope: {},
      restrict: 'EA',
      bindToController: {
        data: '<',
        title: '@?'
      },
      controller: function () {
        var vm = this;
        vm.listView=1;
        vm.filterResults='';
        vm.currentPage=1;
        console.log(vm.data);
      },
      controllerAs: 'vm',
      templateUrl: 'directives/list/list.view.html'
    };
  });
})();
