(function () {
  'use strict';

  angular.module('app.search.controllers',['ngMap', 'app.shared'])
    .controller('SearchCtrl', [ 'NgMap', 'ApiService','$state', function(NgMap, ApiService, $state) {
      var vm = this;

      vm.search = {};

      vm.placeChanged = function() {
        var geo = this;
        vm.place = geo.getPlace();
        console.log('location', vm.place.geometry.location);
      };

      NgMap.getMap().then(function(map) {
        vm.map = map;
      });

      function formatDateString( dts) {
        var bits = dts.split("-");
        return [bits[1],bits[2], bits[0]].join("/");
      }

      vm.submit = function (form) {
        console.log(vm.place);

        var params = {
          'dest': form.location.$viewValue,
          'startdate': formatDateString(form.pickupDate.$viewValue),
          'enddate': formatDateString(form.dropoffDate.$viewValue),
          'pickuptime': form.pickupTime.$viewValue,
          'dropofftime': form.dropoffTime.$viewValue
        };

        return $state.go('search.results', { data : params });
      };
    }]);
})();
