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
