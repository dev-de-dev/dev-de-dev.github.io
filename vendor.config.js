/**
 * The `vendor_files` property in Gruntfile.js holds files to be automatically
 * concatenated and minified with our project source files.
 *
 * NOTE: Use the *.min.js version when compiling for production.
 * Otherwise, use the normal *.js version for development
 *
 */

module.exports = {
    js: [

      'node_modules/jquery/dist/jquery.min.js',
      // Angular components
      'node_modules/angular/angular.js',
      'node_modules/angular-ui-router/release/angular-ui-router.min.js',
      'node_modules/angular-mocks/angular-mocks.js',

      // NgMap
      'node_modules/ngmap/build/scripts/ng-map.min.js',

      // utility libraries
      'node_modules/materialize-css/dist/js/materialize.min.js',
      'node_modules/angular-materialize/src/angular-materialize.min.js',
      'node_modules/angular-utils-pagination/dirPagination.js',


      // Modernizer
      'node_modules/modernizr/modernizr.js'
    ],
    css: ['node_modules/materialize-css/dist/css/materialize.min.css'],
    assets: [ ]
};
