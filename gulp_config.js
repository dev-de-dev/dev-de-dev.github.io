var pkg = require('./package.json');
var vendor = require('./vendor.config.js');
var isProduction = 'production' === process.env.NODE_ENV;

module.exports = {
  scripts: {
    app:  {
      sources: [
        'src/app/**/*.js',
        '!src/app/**/*.spec.js',
        '!src/app/**/*.e2e.js'
      ],
      destinationFolder: isProduction ? 'production/assets/scripts' : 'public/assets/scripts',
      destinationName: pkg.name + '.js'
    },
    vendor: {
      sources: vendor.js,
      destinationFolder: isProduction ? 'production/assets/scripts' : 'public/assets/scripts',
      destinationName: 'bundle.js'
    }
  },
  sass: {
    sources : ['src/app/**/*.scss'],
    destinationFolder: isProduction ? 'production/assets/css' : 'public/assets/css',
    destinationName: pkg.name + '.css'
  },
  templates: {
    sources : ['src/app/**/*.html'],
    destinationFolder: isProduction ? 'production/assets/scripts' : 'public/assets/scripts'
  },
  fonts: {
    sources : ['node_modules/materialize-css/dist/fonts/**'],
    destinationFolder: isProduction ? 'production/assets/fonts' : 'public/assets/fonts'
  },
  images: {
    sources : ['src/assets/images/*'],
    destinationFolder : isProduction ? 'production/assets/images' : 'public/assets/images'
  },
  vendor: {
    sources : vendor.css,
    destinationFolder: isProduction ? 'production/assets/css' : 'public/assets/css'
  },
  assets: {
    sources : ['src/assets/images/favicon.ico'],
    destinationFolder : isProduction ? 'production/assets/images' : 'public/assets/images'
  },
  index: {
    sources : ['src/index.html'],
    destinationFolder : isProduction ? 'production' : 'public'
  },
  serve: {
    baseDir : isProduction ? 'production' : 'public',
    port : isProduction ? 4000 : 3000
  },
  coverage: {
    destinationFolder: 'reports/coverage/lcov-report',
    port: 5000
  },
  protractor: {
    sources : ['src/app/**/*.e2e.js']
  },
  banner: ['/**',
    ' * <%= pkg.name %> v<%= pkg.version %>',
    ' * Copyright (c) <%= new Date().getFullYear() %> <%= pkg.author %>',
    ' * Licensed under <%= pkg.license %>',
    ' */',
    ''].join('\n')
  ,
  isProduction : isProduction
};
