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
    console.log($scope)
    socket.on('allMovies', function(mov){
      console.log(mov);
      console.log($scope);
      $scope.movies = mov;
    });
  }]).
  controller('ShowCtrl', ['$scope','$http','$routeParams', function($scope, $http, $routeParams){
    
    socket.on('allMovies', function(movies){
      $scope.movies = movies;
    });
  }]).
  controller('EditCtrl', ['$scope','$http','$routeParams', function($scope, $http, $routeParams){
    $http.get('/api/movies').success(function(data){
      console.log(data);
      data.forEach(function(el) {
          if (el.id == $routeParams.id){
            $scope.movie = el;
            console.log
          }
      });;
    });

    $scope.editMovie = function(){
      socket.emit('editMovie', movie);
    };
  }]).
  controller('AddCtrl',['$scope', '$location', function($scope,$location){
    $scope.movie;// = {};

    $scope.addMovie = function(){
      socket.emit('addNew', movie);
      $location.path("/showAll");
    };
  }]);
