'use strict';

/* Controllers */
var socket = io.connect('http://localhost');

var appControllers = angular.module('appControllers', []);
  appControllers.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.tab = 1;

    $scope.activeTab = function(tab){
      $scope.tab = tab;
    };

    $scope.isActive = function(tab){
      return $scope.tab === tab;
    };
    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!';
    });

  }]);
  appControllers.controller('LoginCtrl', ['$scope', function ($scope) {

  }]);
  appControllers.controller('ShowAllCtrl', ['$scope', function ($scope) {
    $scope.movies = [];
    socket.emit('getMovies');
    socket.on('allMovies', function(movies){
      $scope.movies = movies;
      $scope.$apply();
    });
    $scope.deleteMovie = function(id){
      console.log(id);
      socket.emit('deleteMovie',id);
    };
    socket.on('updateMovies', function(){
      socket.emit('getMovies');
    });
  }]);
  appControllers.controller('ShowCtrl', ['$scope','$routeParams', function($scope, $routeParams){
    socket.emit('getMovie',$routeParams.id);
    socket.on('oneMovie', function(movie){
      $scope.movie = movie;
      $scope.$apply();
    });
  }]);
  appControllers.controller('EditCtrl', ['$scope','$routeParams', '$location', function($scope, $routeParams, $location){
    socket.emit('getMovie',$routeParams.id);
    socket.on('oneMovie', function(movie){
      $scope.movie = movie;
      $scope.$apply();
    });

    $scope.editMovie = function(){
      console.log("wtf");
      socket.emit('editMovie', $scope.movie);
      $location.path('/showAll');
    };
  }]);
  appControllers.controller('AddCtrl',['$scope', '$location', function($scope,$location){
    $scope.addMovie = function(){
      socket.emit('addNew', $scope.movie);
      $location.path('/showAll');
    };
  }]);
