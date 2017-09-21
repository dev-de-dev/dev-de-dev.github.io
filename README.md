# Hotwire app based on angular-material-boilerplate

A straightforward and well structured boilerplate based on Google's Angular Material project.

## Features
* Live reload
* Organised folder structure
* Minified CSS, HTML and JS build files
* Minified images.
* SASS support
* Responsive layout
* Mobile ready
* [Material Design Icons](https://material.io/icons/) icons
* Support for Unit & E2E Testing
* Unit Test reporting
* [ESLint](http://eslint.org/) code analysis tool.
* [Jasmine](http://jasmine.github.io/2.3/introduction.html) testing framework
* [Karma](http://karma-runner.github.io/0.13/index.html) test runner
* [Protractor](https://angular.github.io/protractor/#/)  end-to-end test framework

## Live Demo
[Check out the live demo](https://dev-de-dev.github.io/dist/index.html#!/home)

## Setup
1. Install [Git](https://git-scm.com/downloads) and [NodeJS](http://nodejs.org/)
2. `git clone https://github.com/dev-de-dev/dev-de-dev.github.io.git myApp`
3. `cd myApp`
4. `npm install`

## Quick Usage
* `npm start` : Creates a development build folder called `public` and serves it on: [`http://localhost:3000/`](http://localhost:3000/)
* `npm start --production` : Creates a production ready folder called `production` and serves it on: [`http://localhost:4000/`](http://localhost:4000/)
* `npm test` : Runs code checks, unit tests and E2E tests.
* `npm run unit` : Runs unit tests only.
* `npm run e2e` : Runs E2E tests only.
* `npm run eslint` : Runs an ESLint code check only.
* `npm run coverage` : Creates and serves the unit test coverage reports on: [`http://localhost:5000/`](http://localhost:5000/)
* `npm run build` : Creates the `public` build folder but doesn't serve it.
* `npm run build --production` : Creates the `production` build folder but doesn't serve it.


This project has been tested with the following tools:
* **NodeJs:** 6.9.2
* **Npm:** 3.10.9
