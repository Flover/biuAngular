'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('myApp', [
  'appControllers',
  'appFilters',
  'appServices',
  'appDirectives'
]);
app.config(['$routeProvider','$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/showAll',{
      templateUrl: 'partials/showAllMovies',
      controller: 'ShowAllCtrl'
    }).
    when('/show/:id',{
      templateUrl: 'partials/showMovie',
      controller: 'ShowCtrl'
    }).
    when('/edit/:id',{
      templateUrl: 'partials/editMovie',
      controller: 'EditCtrl'
    }).
    when('/addNew',{
      templateUrl: 'partials/addMovie',
      controller: 'AddCtrl'
    }).
    when('/showUsers',{
      templateUrl: 'partials/showUsers',
      controller: 'ShowUsersCtrl'
    }).
    when('/showUser/:id',{
      templateUrl: 'partials/userClips',
      controller: 'ShowUserClipsCtrl'
    }).
    otherwise({
      redirectTo: '/showAll'
    });

  $locationProvider.html5Mode(true);
}]);
