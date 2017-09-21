/**
 * hotwire v1.0.0
 * Copyright (c) 2017 Debashish Mohapatra
 * Licensed under MIT
 */
(function () {
  angular.module('app', [
    /**
     * Dependencies must be injected in specific order:
     * 1) AngularJS dependencies
     * 2) Compiled HTML templates
     * 3) Common Services, Directives, Filters and Utilities
     * 4) Main App Layout
     * 5) Other App components (e.g. Toolbar, About, etc)
     */

    'ui.router',
    'ui.materialize',
    'angularUtils.directives.dirPagination',
    'ngMap',

    // Include compiled HTML templates
    'templates',

    // Components
    'app.directives',
    'app.shared',
    'app.layout',
    'app.search',
    'app.home',
    'app.results'
  ]);
})();

(function () {
  'use strict';
  angular.module('app.home.controllers', []).controller('HomeCtrl', ['results', function(results) {
    var vm = this;
    vm.results = results;
  }]);
})();

(function () {
  'use strict';
  angular.module('app.home', [
    'ui.router',
    'app.home.controllers'
  ]);
})();

(function () {
  'use strict';

  angular.module('app.directives', []);

})();

(function () {
  'use strict';
  angular.module('app.layout.controllers', [])
    .controller('LayoutCtrl', function() {

    });

})();

(function () {
  'use strict';

  angular.module('app.layout', [
    'ui.router',
    'app.layout.controllers'
  ]).config(["$stateProvider", "$urlRouterProvider", function config($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('search', {
          abstract: true,
          views: {
            '@' : {
              templateUrl: 'layout/layout.view.html',
              controller: 'LayoutCtrl',
              controllerAs: 'vm'
            },
            'search@search' : {
              templateUrl: 'search/search.view.html',
              controller: 'SearchCtrl',
              controllerAs: 'vm'
            }
          }
        })
        .state('search.home', {
          url: '/home',
          templateUrl: 'home/home.view.html',
          controller: 'HomeCtrl',
          controllerAs: 'vm',
          resolve : {
            results : ['$stateParams', 'ApiService',function ($stateParams, ApiService) {
              return ApiService.getFeatured();
            }]
          }
        })
        .state('search.results', {
          url: '/results',
          templateUrl: 'results/results.view.html',
          controller: 'ResultsCtrl',
          controllerAs: 'vm',
          params : {
            data : {}
          },
          resolve : {
            results : ['$stateParams', 'ApiService',function ($stateParams, ApiService) {
              return ApiService.get($stateParams.data);
            }]
          }
      });
      $urlRouterProvider.otherwise('/home');
    }]);
})();

(function () {
  'use strict';

  angular.module('app.results.controllers',[])
    .controller('ResultsCtrl', [ 'results', function(results) {
      var vm = this;
      console.log(results);
      vm.results = results;
    }]);
})();

(function () {
  'use strict';

  angular.module('app.results', [
    'ui.router',
    'app.results.controllers',
    'ngMap'
  ]);

})();

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

(function () {
  'use strict';

  angular.module('app.search', [
    'app.search.controllers',
    'ngMap'
  ]);

})();

(function () {
  'use strict';

  angular.module('app.shared.service', [])
    .factory('ApiService', ['$http','$q','$state','$sce', function($http, $q, $state, $sce) {

      var baseUrl = 'https://api.hotwire.com/v1/search/car';

      var mock = {
        'Errors': [],
        'MetaData': {
          'CarMetaData': {
            'CarTypes': [
              {
                'TypicalSeating': '5 adults',
                'CarTypeName': 'Compact',
                'CarTypeCode': 'CCAR',
                'PossibleFeatures': 'Automatic Transmission, Power Steering, Air Conditioning, Air Bags, AM/FM Stereo',
                'PossibleModels': 'Hyundai Accent or similar'
              },
              {
                'TypicalSeating': '4 adults',
                'CarTypeName': 'Economy',
                'CarTypeCode': 'ECAR',
                'PossibleFeatures': 'Automatic Transmission, Air Conditioning, Air Bags, AM/FM Stereo',
                'PossibleModels': 'Kia Rio or similar'
              },
              {
                'TypicalSeating': '5 adults',
                'CarTypeName': 'Full Size',
                'CarTypeCode': 'FCAR',
                'PossibleFeatures': 'Automatic Transmission, Power Steering, Air Conditioning, Air Bags, Anti-Lock Brakes, Cruise Control, AM/FM Stereo',
                'PossibleModels': 'Ford Fusion or similar'
              },
              {
                'TypicalSeating': '7 adults',
                'CarTypeName': 'Full Size SUV',
                'CarTypeCode': 'FFAR',
                'PossibleFeatures': 'Automatic Transmission, Power Steering, Air Conditioning, Air Bags, Cruise Control, AM/FM Stereo, CD Player',
                'PossibleModels': 'Chevy Tahoe, Toyota Highlander, or similar'
              },
              {
                'TypicalSeating': '4 adults',
                'CarTypeName': 'Midsize',
                'CarTypeCode': 'ICAR',
                'PossibleFeatures': 'Automatic Transmission, Power Steering, Air Conditioning, Air Bags, AM/FM Stereo',
                'PossibleModels': 'Toyota Corolla, Nissan Sentra, or similar'
              },
              {
                'TypicalSeating': '5 adults',
                'CarTypeName': 'Midsize SUV',
                'CarTypeCode': 'IFAR',
                'PossibleFeatures': 'Automatic Transmission, Air Conditioning',
                'PossibleModels': 'Toyota Rav4 or similar'
              },
              {
                'TypicalSeating': '5 adults',
                'CarTypeName': 'Luxury',
                'CarTypeCode': 'LCAR',
                'PossibleFeatures': 'Automatic Transmission, Power Steering, Air Conditioning, Air Bags, Anti-Lock Brakes, Cruise Control, AM/FM Stereo, CD Player',
                'PossibleModels': 'Cadillac ATS or similar'
              },
              {
                'TypicalSeating': '7 adults',
                'CarTypeName': 'Minivan',
                'CarTypeCode': 'MVAR',
                'PossibleFeatures': 'Automatic Transmission, Power Steering, Air Conditioning, Air Bags, Anti-Lock Brakes, Cruise Control, AM/FM Stereo',
                'PossibleModels': 'Dodge Grand Caravan or similar'
              },
              {
                'TypicalSeating': '5 adults',
                'CarTypeName': 'Premium',
                'CarTypeCode': 'PCAR',
                'PossibleFeatures': 'Automatic Transmission, Power Steering, Air Conditioning, Air Bags, Anti-Lock Brakes, Cruise Control, AM/FM Stereo, CD Player',
                'PossibleModels': 'Nissan Maxima or similar'
              },
              {
                'TypicalSeating': '5 adults',
                'CarTypeName': 'Standard',
                'CarTypeCode': 'SCAR',
                'PossibleFeatures': 'Automatic Transmission, Power Steering, Air Conditioning, Air Bags, Anti-Lock Brakes, AM/FM Stereo',
                'PossibleModels': 'Volkswagen Jetta or similar'
              },
              {
                'TypicalSeating': '5 adults',
                'CarTypeName': 'Standard SUV',
                'CarTypeCode': 'SFAR',
                'PossibleFeatures': 'Automatic Transmission, Power Steering, Air Conditioning, Air Bags, Anti-Lock Brakes, Cruise Control, AM/FM Stereo, CD Player',
                'PossibleModels': 'Hyundai Santa Fe or similar'
              },
              {
                'TypicalSeating': '4 adults',
                'CarTypeName': 'Standard Pickup truck',
                'CarTypeCode': 'SPAR',
                'PossibleFeatures': 'Automatic Transmission, Power Steering, Air Conditioning, Air Bags, Cruise Control, Anti-Lock Brakes, AM/FM Stereo',
                'PossibleModels': 'Chevy Colorado or similar'
              },
              {
                'TypicalSeating': '4 adults',
                'CarTypeName': 'Convertible',
                'CarTypeCode': 'STAR',
                'PossibleFeatures': 'Automatic Transmission, Power Steering, Air Conditioning, Air Bags, Cruise Control, Anti-Lock Brakes, AM/FM Stereo',
                'PossibleModels': 'Ford Mustang, Chrysler Sebring,  or similar'
              },
              {
                'TypicalSeating': '4 adults or more',
                'CarTypeName': 'Special car',
                'CarTypeCode': 'XXAR',
                'PossibleFeatures': 'Automatic Transmission, Air Conditioning, Air Bags, AM/FM Stereo',
                'PossibleModels': 'Compact size or larger but priced low like a compact'
              }
            ]
          }
        },
        'Result': [
          {
            "CurrencyCode": "USD",
            "DeepLink": "https://www.hotwire.com/car/deeplink-details.jsp?resultId=MjA0NTI5NzU4NTU6MTU5NzMwNDQwNzE4Ng--&useCluster=2&sid=S001&bid=B001&inputId=api-results&actionType=303&useCluster=2",
            "ResultId": "MjA0NTI5NzU4NTU6MTU5NzMwNDQwNzE4Ng--&useCluster=2",
            "HWRefNumber": "3997831304",
            "SubTotal": "48.96",
            "TaxesAndFees": "6.09",
            "TotalPrice": "55.05",
            "CarTypeCode": "ECAR",
            "DailyRate": "48.96",
            "DropoffDay": "09/21/2017",
            "DropoffTime": "13:30",
            "PickupDay": "09/21/2017",
            "PickupTime": "10:00",
            "LocationDescription": "Contact Vendor for Location",
            "MileageDescription": "Unlimited",
            "PickupAirport": [],
            "RentalAgency": "Enterprise",
            "RentalDays": "1",
            "VendorLocation": "26 New St (fresh Pond), Cambridge, MA 02138, US",
            "VendorLocationId": "BOSW016"
          },
          {
            "CurrencyCode": "USD",
            "DeepLink": "https://www.hotwire.com/car/deeplink-details.jsp?resultId=MjA0NTI5NzU4NTU6MTU5NzMwNDQwNjk2Mg--&useCluster=2&sid=S001&bid=B001&inputId=api-results&actionType=303&useCluster=2",
            "ResultId": "MjA0NTI5NzU4NTU6MTU5NzMwNDQwNjk2Mg--&useCluster=2",
            "HWRefNumber": "3150610502",
            "SubTotal": "39.01",
            "TaxesAndFees": "33.05",
            "TotalPrice": "72.06",
            "CarTypeCode": "IFAR",
            "DailyRate": "39.01",
            "DropoffDay": "09/21/2017",
            "DropoffTime": "13:30",
            "PickupDay": "09/21/2017",
            "PickupTime": "10:00",
            "LocationDescription": "On Airport - Shuttle to Vendor",
            "MileageDescription": "Unlimited",
            "PickupAirport": "BOS",
            "RentalDays": "1",
            "VendorLocationId": "BOSBOS"
          },
          {
            'CurrencyCode': 'USD',
            'DeepLink': 'https://www.hotwire.com/car/deeplink-details.jsp?resultId=MjA0NTI4MTc2MTE6MTU5NzI4ODY0NDY5MA--&useCluster=2&sid=S001&bid=B001&inputId=api-results&actionType=303&useCluster=2',
            'ResultId': 'MjA0NTI4MTc2MTE6MTU5NzI4ODY0NDY5MA--&useCluster=2',
            'HWRefNumber': '3142949850',
            'SubTotal': '43.61',
            'TaxesAndFees': '20.81',
            'TotalPrice': '64.42',
            'CarTypeCode': 'SPAR',
            'DailyRate': '43.61',
            'DropoffDay': '09/21/2017',
            'DropoffTime': '13:30',
            'PickupDay': '09/21/2017',
            'PickupTime': '10:00',
            'LocationDescription': 'Counter in airport; Shuttle to car',
            'MileageDescription': 'Unlimited',
            'PickupAirport': 'LAX',
            'RentalDays': '1',
            'VendorLocationId': 'LAXLAX'
          },
          {
            'CurrencyCode': 'USD',
            'DeepLink': 'https://www.hotwire.com/car/deeplink-details.jsp?resultId=MjA0NTI4MTc2MTE6MTU5NzI4ODY0NDY4Nw--&useCluster=2&sid=S001&bid=B001&inputId=api-results&actionType=303&useCluster=2',
            'ResultId': 'MjA0NTI4MTc2MTE6MTU5NzI4ODY0NDY4Nw--&useCluster=2',
            'HWRefNumber': '4992804079',
            'SubTotal': '45.00',
            'TaxesAndFees': '22.42',
            'TotalPrice': '67.42',
            'CarTypeCode': 'ECAR',
            'DailyRate': '45.00',
            'DropoffDay': '09/21/2017',
            'DropoffTime': '13:30',
            'PickupDay': '09/21/2017',
            'PickupTime': '10:00',
            'LocationDescription': 'Counter in airport; Shuttle to car',
            'MileageDescription': 'Unlimited',
            'PickupAirport': 'LAX',
            'RentalDays': '1',
            'VendorLocationId': 'LAXLAX'
          },
          {
            'CurrencyCode': 'USD',
            'DeepLink': 'https://www.hotwire.com/car/deeplink-details.jsp?resultId=MjA0NTI4MTc2MTE6MTU5NzI4ODY0NDczMQ--&useCluster=2&sid=S001&bid=B001&inputId=api-results&actionType=303&useCluster=2',
            'ResultId': 'MjA0NTI4MTc2MTE6MTU5NzI4ODY0NDczMQ--&useCluster=2',
            'HWRefNumber': '4219577087',
            'SubTotal': '45.00',
            'TaxesAndFees': '22.48',
            'TotalPrice': '67.48',
            'CarTypeCode': 'CCAR',
            'DailyRate': '45.00',
            'DropoffDay': '09/21/2017',
            'DropoffTime': '13:30',
            'PickupDay': '09/21/2017',
            'PickupTime': '10:00',
            'LocationDescription': 'Counter in airport; Shuttle to car',
            'MileageDescription': 'Unlimited',
            'PickupAirport': 'LAX',
            'RentalDays': '1',
            'VendorLocationId': 'LAXLAX'
          },
          {
            'CurrencyCode': 'USD',
            'DeepLink': 'https://www.hotwire.com/car/deeplink-details.jsp?resultId=MjA0NTI4MTc2MTE6MTU5NzI4ODY0NDcyMg--&useCluster=2&sid=S001&bid=B001&inputId=api-results&actionType=303&useCluster=2',
            'ResultId': 'MjA0NTI4MTc2MTE6MTU5NzI4ODY0NDcyMg--&useCluster=2',
            'HWRefNumber': '3718115853',
            'SubTotal': '44.32',
            'TaxesAndFees': '27.39',
            'TotalPrice': '71.71',
            'CarTypeCode': 'MVAR',
            'DailyRate': '44.32',
            'DropoffDay': '09/21/2017',
            'DropoffTime': '13:30',
            'PickupDay': '09/21/2017',
            'PickupTime': '10:00',
            'LocationDescription': 'Counter in airport; Shuttle to car',
            'MileageDescription': 'Unlimited',
            'PickupAirport': 'LAX',
            'RentalDays': '1',
            'VendorLocationId': 'LAXLAX'
          },
          {
            'CurrencyCode': 'USD',
            'DeepLink': 'https://www.hotwire.com/car/deeplink-details.jsp?resultId=MjA0NTI4MTc2MTE6MTU5NzI4ODY0NDc0MQ--&useCluster=2&sid=S001&bid=B001&inputId=api-results&actionType=303&useCluster=2',
            'ResultId': 'MjA0NTI4MTc2MTE6MTU5NzI4ODY0NDc0MQ--&useCluster=2',
            'HWRefNumber': '3597381557',
            'SubTotal': '50.00',
            'TaxesAndFees': '23.72',
            'TotalPrice': '73.72',
            'CarTypeCode': 'ICAR',
            'DailyRate': '50.00',
            'DropoffDay': '09/21/2017',
            'DropoffTime': '13:30',
            'PickupDay': '09/21/2017',
            'PickupTime': '10:00',
            'LocationDescription': 'Counter in airport; Shuttle to car',
            'MileageDescription': 'Unlimited',
            'PickupAirport': 'LAX',
            'RentalDays': '1',
            'VendorLocationId': 'LAXLAX'
          },
          {
            'CurrencyCode': 'USD',
            'DeepLink': 'https://www.hotwire.com/car/deeplink-details.jsp?resultId=MjA0NTI4MTc2MTE6MTU5NzI4ODY0NDY3Mg--&useCluster=2&sid=S001&bid=B001&inputId=api-results&actionType=303&useCluster=2',
            'ResultId': 'MjA0NTI4MTc2MTE6MTU5NzI4ODY0NDY3Mg--&useCluster=2',
            'HWRefNumber': '3460673823',
            'SubTotal': '55.00',
            'TaxesAndFees': '24.98',
            'TotalPrice': '79.98',
            'CarTypeCode': 'SCAR',
            'DailyRate': '55.00',
            'DropoffDay': '09/21/2017',
            'DropoffTime': '13:30',
            'PickupDay': '09/21/2017',
            'PickupTime': '10:00',
            'LocationDescription': 'Counter in airport; Shuttle to car',
            'MileageDescription': 'Unlimited',
            'PickupAirport': 'LAX',
            'RentalDays': '1',
            'VendorLocationId': 'LAXLAX'
          },
          {
            'CurrencyCode': 'USD',
            'DeepLink': 'https://www.hotwire.com/car/deeplink-details.jsp?resultId=MjA0NTI4MTc2MTE6MTU5NzI4ODY0NDc5NA--&useCluster=2&sid=S001&bid=B001&inputId=api-results&actionType=303&useCluster=2',
            'ResultId': 'MjA0NTI4MTc2MTE6MTU5NzI4ODY0NDc5NA--&useCluster=2',
            'HWRefNumber': '3228836801',
            'SubTotal': '55.00',
            'TaxesAndFees': '25.20',
            'TotalPrice': '80.20',
            'CarTypeCode': 'FCAR',
            'DailyRate': '55.00',
            'DropoffDay': '09/21/2017',
            'DropoffTime': '13:30',
            'PickupDay': '09/21/2017',
            'PickupTime': '10:00',
            'LocationDescription': 'Counter in airport; Shuttle to car',
            'MileageDescription': 'Unlimited',
            'PickupAirport': 'LAX',
            'RentalDays': '1',
            'VendorLocationId': 'LAXLAX'
          },
          {
            'CurrencyCode': 'USD',
            'DeepLink': 'https://www.hotwire.com/car/deeplink-details.jsp?resultId=MjA0NTI4MTc2MTE6MTU5NzI4ODY0NDczMw--&useCluster=2&sid=S001&bid=B001&inputId=api-results&actionType=303&useCluster=2',
            'ResultId': 'MjA0NTI4MTc2MTE6MTU5NzI4ODY0NDczMw--&useCluster=2',
            'HWRefNumber': '4226795369',
            'SubTotal': '58.50',
            'TaxesAndFees': '26.33',
            'TotalPrice': '84.83',
            'CarTypeCode': 'PCAR',
            'DailyRate': '58.50',
            'DropoffDay': '09/21/2017',
            'DropoffTime': '13:30',
            'PickupDay': '09/21/2017',
            'PickupTime': '10:00',
            'LocationDescription': 'Counter in airport; Shuttle to car',
            'MileageDescription': 'Unlimited',
            'PickupAirport': 'LAX',
            'RentalDays': '1',
            'VendorLocationId': 'LAXLAX'
          },
          {
            'CurrencyCode': 'USD',
            'DeepLink': 'https://www.hotwire.com/car/deeplink-details.jsp?resultId=MjA0NTI4MTc2MTE6MTU5NzI4ODY0NDcyOQ--&useCluster=2&sid=S001&bid=B001&inputId=api-results&actionType=303&useCluster=2',
            'ResultId': 'MjA0NTI4MTc2MTE6MTU5NzI4ODY0NDcyOQ--&useCluster=2',
            'HWRefNumber': '4641541089',
            'SubTotal': '60.74',
            'TaxesAndFees': '26.18',
            'TotalPrice': '86.92',
            'CarTypeCode': 'SFAR',
            'DailyRate': '60.74',
            'DropoffDay': '09/21/2017',
            'DropoffTime': '13:30',
            'PickupDay': '09/21/2017',
            'PickupTime': '10:00',
            'LocationDescription': 'Off Airport - Shuttle to Vendor',
            'MileageDescription': 'Unlimited',
            'PickupAirport': 'LAX',
            'RentalDays': '1',
            'VendorLocationId': 'LAXLAX'
          },
          {
            'CurrencyCode': 'USD',
            'DeepLink': 'https://www.hotwire.com/car/deeplink-details.jsp?resultId=MjA0NTI4MTc2MTE6MTU5NzI4ODY0NDc5OQ--&useCluster=2&sid=S001&bid=B001&inputId=api-results&actionType=303&useCluster=2',
            'ResultId': 'MjA0NTI4MTc2MTE6MTU5NzI4ODY0NDc5OQ--&useCluster=2',
            'HWRefNumber': '4567497013',
            'SubTotal': '61.51',
            'TaxesAndFees': '26.59',
            'TotalPrice': '88.10',
            'CarTypeCode': 'XXAR',
            'DailyRate': '61.51',
            'DropoffDay': '09/21/2017',
            'DropoffTime': '13:30',
            'PickupDay': '09/21/2017',
            'PickupTime': '10:00',
            'LocationDescription': 'Counter in airport; Shuttle to car',
            'MileageDescription': 'Unlimited',
            'PickupAirport': 'LAX',
            'RentalDays': '1',
            'VendorLocationId': 'LAXLAX'
          },
          {
            'CurrencyCode': 'USD',
            'DeepLink': 'https://www.hotwire.com/car/deeplink-details.jsp?resultId=MjA0NTI4MTc2MTE6MTU5NzI4ODY0NDc0Mg--&useCluster=2&sid=S001&bid=B001&inputId=api-results&actionType=303&useCluster=2',
            'ResultId': 'MjA0NTI4MTc2MTE6MTU5NzI4ODY0NDc0Mg--&useCluster=2',
            'HWRefNumber': '4549303253',
            'SubTotal': '71.69',
            'TaxesAndFees': '27.79',
            'TotalPrice': '99.48',
            'CarTypeCode': 'LCAR',
            'DailyRate': '71.69',
            'DropoffDay': '09/21/2017',
            'DropoffTime': '13:30',
            'PickupDay': '09/21/2017',
            'PickupTime': '10:00',
            'LocationDescription': 'Counter in airport; Shuttle to car',
            'MileageDescription': 'Unlimited',
            'PickupAirport': 'LAX',
            'RentalDays': '1',
            'VendorLocationId': 'LAXLAX'
          },
          {
            'CurrencyCode': 'USD',
            'DeepLink': 'https://www.hotwire.com/car/deeplink-details.jsp?resultId=MjA0NTI4MTc2MTE6MTU5NzI4ODY0NDY5NA--&useCluster=2&sid=S001&bid=B001&inputId=api-results&actionType=303&useCluster=2',
            'ResultId': 'MjA0NTI4MTc2MTE6MTU5NzI4ODY0NDY5NA--&useCluster=2',
            'HWRefNumber': '4483546035',
            'SubTotal': '65.00',
            'TaxesAndFees': '40.00',
            'TotalPrice': '105.00',
            'CarTypeCode': 'FFAR',
            'DailyRate': '65.00',
            'DropoffDay': '09/21/2017',
            'DropoffTime': '13:30',
            'PickupDay': '09/21/2017',
            'PickupTime': '10:00',
            'LocationDescription': 'On Airport - Shuttle to Vendor',
            'MileageDescription': 'Unlimited',
            'PickupAirport': 'LAX',
            'RentalDays': '1',
            'VendorLocationId': 'LAXLAX'
          },
          {
            'CurrencyCode': 'USD',
            'DeepLink': 'https://www.hotwire.com/car/deeplink-details.jsp?resultId=MjA0NTI4MTc2MTE6MTU5NzI4ODY0NDcwMg--&useCluster=2&sid=S001&bid=B001&inputId=api-results&actionType=303&useCluster=2',
            'ResultId': 'MjA0NTI4MTc2MTE6MTU5NzI4ODY0NDcwMg--&useCluster=2',
            'HWRefNumber': '4337341033',
            'SubTotal': '66.62',
            'TaxesAndFees': '41.50',
            'TotalPrice': '108.12',
            'CarTypeCode': 'IFAR',
            'DailyRate': '66.62',
            'DropoffDay': '09/21/2017',
            'DropoffTime': '13:30',
            'PickupDay': '09/21/2017',
            'PickupTime': '10:00',
            'LocationDescription': 'On Airport - Shuttle to Vendor',
            'MileageDescription': 'Unlimited',
            'PickupAirport': 'LAX',
            'RentalDays': '1',
            'VendorLocationId': 'LAXLAX'
          },
          {
            'CurrencyCode': 'USD',
            'DeepLink': 'https://www.hotwire.com/car/deeplink-details.jsp?resultId=MjA0NTI4MTc2MTE6MTU5NzI4ODY0NDc1OQ--&useCluster=2&sid=S001&bid=B001&inputId=api-results&actionType=303&useCluster=2',
            'ResultId': 'MjA0NTI4MTc2MTE6MTU5NzI4ODY0NDc1OQ--&useCluster=2',
            'HWRefNumber': '4718476896',
            'SubTotal': '171.70',
            'TaxesAndFees': '52.66',
            'TotalPrice': '224.36',
            'CarTypeCode': 'STAR',
            'DailyRate': '171.70',
            'DropoffDay': '09/21/2017',
            'DropoffTime': '13:30',
            'PickupDay': '09/21/2017',
            'PickupTime': '10:00',
            'LocationDescription': 'Counter in airport; Shuttle to car',
            'MileageDescription': 'Unlimited',
            'PickupAirport': 'LAX',
            'RentalDays': '1',
            'VendorLocationId': 'LAXLAX'
          }
        ],
        'StatusCode': '0',
        'StatusDesc': 'success'
      };

      var params = {
        'apikey':'2y9ecuu5jsqb43bvrzw4gntb',
        'format':'json'};

      var service ={
        get: getResults,
        getFeatured : function () {
          return $q.when(mock);
        }
      };

      function getResults(config) {
        return $http.get(baseUrl, {
          params : angular.extend({}, params, config)
        }).then(function(response){
          return response.data;
        }).catch(function (e) {
          console.error(e);
          var msg = 'An unexpected sever error happened. Please try again some time later. If the issue persists, contact our Help Desk.';
          Materialize.toast(msg, 4000, '', function(){
            $state.go('search.home');
          });
        });
      }

      return service;

    }]);
})();

(function () {
  'use strict';

  angular.module('app.shared', ['app.shared.service']);

})();

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
