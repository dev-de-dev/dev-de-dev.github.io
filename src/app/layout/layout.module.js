(function () {
  'use strict';

  angular.module('app.layout', [
    'ui.router',
    'app.layout.controllers'
  ]).config(function config($stateProvider, $urlRouterProvider) {
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
    });
})();
