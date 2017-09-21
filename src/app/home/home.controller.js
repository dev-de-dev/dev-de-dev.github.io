(function () {
  'use strict';
  angular.module('app.home.controllers', []).controller('HomeCtrl', ['results', function(results) {
    var vm = this;
    vm.results = results;
  }]);
})();
