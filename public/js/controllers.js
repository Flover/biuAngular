'use strict';

/* Controllers */
var socket = io.connect('http://localhost');

var appControllers = angular.module('appControllers', []);
  appControllers.controller('AppCtrl', ['$scope', 'AuthService', 'Session', '$rootScope', function ($scope, AuthService, Session, $rootScope) {
    $scope.tab = 1;
    $rootScope.userSession = {
      username: "",
      sessionId: null,
      userId: null
    };
    $rootScope.isLogged = false;


    $scope.activeTab = function(tab){
      $scope.tab = tab;
    };

    $scope.isActive = function(tab){
      return $scope.tab === tab;
    };

  }]);
  appControllers.controller('LoginCtrl', ['$scope', 'AuthService', function ($scope, AuthService) {
    $scope.username = "";

    $scope.register = function(){
      AuthService.register($scope.username);
    };

    $scope.login = function(){
      AuthService.login($scope.username);
    };
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
