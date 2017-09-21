(function () {
  'use strict';

  angular.module('app.results.controllers',[])
    .controller('ResultsCtrl', [ 'results', function(results) {
      var vm = this;
      console.log(results);
      vm.results = results;
    }]);
})();
