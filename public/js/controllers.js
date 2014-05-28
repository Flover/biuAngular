'use strict';

/* Controllers */
var socket = io.connect('http://localhost');

angular.module('myApp.controllers', []).
  controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {

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

  }]).
  controller('LoginCtrl', ['$scope', function ($scope) {
    
  }]).
  controller('ShowAllCtrl', ['$scope', '$http', function ($scope, $http) {
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
  }]).
  controller('ShowCtrl', ['$scope','$routeParams', function($scope, $routeParams){
    socket.emit('getMovie',$routeParams.id);
    socket.on('oneMovie', function(movie){
      $scope.movie = movie;
      $scope.$apply();
    });
  }]).
  controller('EditCtrl', ['$scope','$routeParams', function($scope, $routeParams){
    socket.emit('getMovie',$routeParams.id);
    socket.on('oneMovie', function(movie){
      $scope.movie = movie;
      $scope.$apply();
    });

    $scope.editMovie = function(){
      socket.emit('editMovie', movie);
    };
  }]).
  controller('AddCtrl',['$scope', '$location', function($scope,$location){
    $scope.addMovie = function(){
      socket.emit('addNew', $scope.movie);
      $location.path("/showAll");
    };
  }]);
